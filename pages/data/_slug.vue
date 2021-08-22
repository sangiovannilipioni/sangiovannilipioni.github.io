<template>
  <client-only>
    <article class="container">
      <h4 id="title">
        {{ title }}
        <span class="text-muted" style="font-size: smaller">[{{ $route.params.slug }}]</span>
      </h4>
      <ul role="tablist" class="nav nav-tabs">
        <div type="button" class="discret btn btn-outline-secondary" @click="showBreadcrumbs = !showBreadcrumbs">
          <font-awesome-icon v-if="!showBreadcrumbs" :icon="['fas', 'plus']" />
          <font-awesome-icon v-else :icon="['fas', 'minus']" />
        </div>
        <li class="nav-item" v-for="(sheet, sheet_index) in datum" :key="sheet_index">
          <a :href="`#${sheet.id}`" data-toggle="tab" :class="`nav-link ${sheet_index == 0 ? 'active' : ''}`">
            {{ sheet.title }}
          </a>
        </li>
      </ul>
      <div class="tab-content mt-3" id="myTabContent">
        <div
          :class="`tab-pane fade ${sheet_index == 0 ? 'show active' : ''}`"
          v-for="(sheet, sheet_index) in datum"
          :key="sheet_index"
          :id="sheet.id"
        >
          <table class="table table-sm table-responsive table-borderless">
            <tr v-for="(row, row_index) in sheet.rows" :key="row_index" :style="row.style">
              <td
                v-for="(cell, col_index) in toTrueArray(row, sheet.columnCount, sheet.sheet)"
                :key="col_index"
                :style="cell.style"
                :colspan="cell.colspan"
                :rowspan="cell.rowspan"
                :class="showBreadcrumbs ? cell.class : ''"
                v-html="cell.text"
              ></td>
            </tr>
          </table>
        </div>
      </div>
    </article>
  </client-only>
</template>

<style lang="scss" scoped>
#title {
  text-align: center;
}
.discret {
  margin: auto 0.25rem;
  padding: 0 0.25rem;
  color: lightgray;
  border: none;
  font-size: smaller;
}
table {
  overflow-y: hidden;
}
td:nth-child(1):not(.breadcrumbs) {
  display: none;
}
td:nth-child(1).breadcrumbs {
  color: darkgray;
  font-family: "Courier New", monospace;
  font-size: 12pt;
  white-space: nowrap;
}
td:nth-child(2) {
  text-align: left;
}
#_02_descriz_edificio td:nth-child(3) {
  text-align: right;
}
#_03_dati_metrici_AB {
  td:nth-child(4) {
    width: 25%;
  }
  td:nth-child(5) {
    width: 5%;
  }
  td:nth-child(6) {
    text-align: right;
    width: 5%;
  }
}
#_04_dati_costrutt_VERT_IQM {
  td:nth-child(7) {
    width: 25%;
  }
}
#_04_dati_costrutt_CARENZE {
  td:nth-child(7) {
    width: 25%;
  }
}
</style>

<script>
export default {
  data() {
    return {
      showBreadcrumbs: false,
      title: "",
      units: {
        O02: {},
        G01: {}
      }
    }
  },
  async fetch() {
    const data = this.massageData(await fetch("/json/Sintesi_O2_v2.json").then((res) => res.json()))
    this.units[this.$route.params.slug] = data
  },
  fetchOnServer: false,
  fetchKey: "dugenou",
  methods: {
    massageData(json) {
      function appendStyle(elem, style) {
        elem.style = { ...elem.style, ...style }
      }

      function isUpper(str) {
        return !/[a-z]/.test(str) && /[A-Z]/.test(str)
      }

      function formatNumber(cell) {
        if (!isNaN(cell.text)) {
          if (cell.col !== "0") {
            cell.text = parseFloat(cell.text).toFixed(2)
          }
          cell.text = cell.text.replace(/\.0+$/, '').replace(/(\.[1-9]*)0+$/, '$1')
        }
      }

      const sheetTitles = {
        "01_id_edificio": "Identificazione",
        "02_descriz_edificio": "Descrizione",
        "03_dati_metrici_AB": "Dati metrici",
        "04_dati_costrutt_VERT_IQM": "Caratteristiche costruttive muratura",
        "04_dati_costrutt_CARENZE": "Caratteristiche costruttive solai"
      }

      // remove all sheets that have no title
      json = json.filter((sheet) => sheetTitles[sheet.sheet])

      // for all sheets
      json.forEach((sheet) => {
        // set id
        sheet.id = `_${sheet.sheet.replace(" ", "_")}`
        // set title
        sheet.title = sheetTitles[sheet.sheet]

        // remove first row
        sheet.rows.shift()

        let is_01_id_edificio = sheet.sheet === "01_id_edificio"
        let is_02_descriz_edificio = sheet.sheet === "02_descriz_edificio"
        let is_03_dati_metrici_AB = sheet.sheet === "03_dati_metrici_AB"
        let is_04_dati_costrutt_VERT_IQM = sheet.sheet === "04_dati_costrutt_VERT_IQM"
        let is_04_dati_costrutt_CARENZE = sheet.sheet === "04_dati_costrutt_CARENZE"

        let ignoreNextRows = undefined
        let nextRowColor = undefined
        let nextColumnBackground = undefined

        let breadcrumb = {
          id: undefined,
          row: 0,
          aliases: {
            "4.2.1": "4.2.1",
            "4.2.2": "4.2.2",
            "4.4.2": "4.4.2_4.4.3",
            "4.4.3": "4.4.2_4.4.3",
            "4.4.4": "4.4.4"
          },
          get level() {
            let ret = 0
            if (this.id) {
              ret = 1 + (this.id.match(/\./g) || []).length
            }
            return ret
          },
          get jpeg() {
            return this.aliases[this.id]
          }
        }

        let ignoreNextNextColumns = undefined

        // for all rows
        sheet.rows.forEach((row, rowindex) => {
          let ignoreThisRow = false
          // hide ignored rows
          if (ignoreNextRows === true) {
            ignoreThisRow = true
          }
          // consume row color
          if (nextRowColor) {
            appendStyle(row, { color: nextRowColor })
            nextRowColor = undefined
          }

          const fixTypos = {
            "stato di conservaz": "stato di conservazione",
            carenzestrutturali: "carenze strutturali"
          }

          let indirizzo = undefined
          let appendImage = undefined
          let columnBackground = undefined
          // consume column background color
          if (nextColumnBackground) {
            columnBackground = nextColumnBackground
            nextColumnBackground = undefined
          }
          // for all cols
          row.forEach((cell, colindex) => {
            // for each column -------------------------------------------------

            // fix typos
            cell.text = fixTypos[cell.text] || cell.text

            // if first column is column zero, and is a numeric, style the row with gray background
            if (colindex === 0) {
              if (cell.col === "0" && !isNaN(cell.text.replace(".", ""))) {
                breadcrumb.id = cell.text
                breadcrumb.row = 0

                let bgColor = "#eee"

                // for 'Carenze' and 'Qualità' sheets, darker gray for 3rd level (e.g. 'x.y.z') very first row
                if (is_04_dati_costrutt_CARENZE || is_04_dati_costrutt_VERT_IQM) {
                  if (breadcrumb.level === 3 && breadcrumb.row === 0) {
                    bgColor = "#ddd"
                    ignoreNextNextColumns = false
                  }
                }

                appendStyle(row, {
                  backgroundColor: bgColor,
                  display: "table.row"
                })
              }
            }

            // format numbers
            formatNumber(cell)

            const appendBackgroundImage = (rowspan) => {
              ignoreNextNextColumns = true
              if (breadcrumb.jpeg) {
                appendImage = {
                  col: "5",
                  rowspan: rowspan || "4",
                  text: "‌&zwnj;",
                  style:
                    "position: relative; background: center / cover no-repeat url(/json/jpegs/" +
                    breadcrumb.jpeg +
                    ".jpg)"
                }
              }
            }

            // special case 1 -------------------------------------------------
            if (is_01_id_edificio) {
              if (cell.text === "DATI CATASTALI") {
                ignoreNextRows = true
                ignoreThisRow = true
                // appendStyle(row, { display: "none" })
              }
              if (indirizzo) {
                this.title = cell.text
                indirizzo = undefined
              }
              if (cell.text === "INDIRIZZO") {
                indirizzo = cell
              }
            }
            // special case 2 -------------------------------------------------
            else if (is_02_descriz_edificio) {
              // next row text will be red
              if (cell.text === "CARATTERISTICHE EDIFICIO" || cell.text === "estremità") {
                nextRowColor = "#a42424"
              }
            }

            // special case 4 -------------------------------------------------
            else if (is_04_dati_costrutt_VERT_IQM) {
              if (ignoreNextNextColumns && 4 < cell.col) {
                appendStyle(cell, { display: "none" })
              }
              if (cell.col <= 3 && cell.text.match(/(codice id. elementi costruttivi|IQMv|IQMo,fp|IQMo,np)/g)) {
                ignoreThisRow = true
              }

              if (cell.text.match(/pareti (interne|esterne)/g)) {
                columnBackground = undefined
                appendStyle(cell, { fontWeight: 600 })
              }
              if (cell.text.match(/CATEGORIA/g)) {
                ignoreThisRow = true
              }
              if (cell.text.match(/A[1234]/g)) {
                columnBackground = "#c6e0b3"
                nextColumnBackground = "#eee"
                appendStyle(cell, { fontWeight: 600 })
              }
              if (cell.text.match(/materiali/g)) {
                appendBackgroundImage()
              }
              if (columnBackground && 1 <= cell.col && cell.col <= 3) {
                if (0 < breadcrumb.row) {
                  appendStyle(cell, { backgroundColor: columnBackground })
                }
                // add center for this
                if (columnBackground === "#eee" && 0 < breadcrumb.row) {
                  appendStyle(cell, { textAlign: "center" })
                }
                // consume gray, prepare next row
                if (columnBackground === "#eee") {
                  columnBackground = "#eff5e9"
                  nextColumnBackground = "#eee"
                }
              }
            }

            // special case 5 -------------------------------------------------
            else if (is_04_dati_costrutt_CARENZE) {
              if (ignoreNextNextColumns && 4 < cell.col) {
                appendStyle(cell, { display: "none" })
              }
              if (cell.col === "3" && 0 < breadcrumb.row) {
                cell.colspan = "2"
              }
              // stop ignoring rows when meeting full uppercase cell or new section
              if (ignoreThisRow && (isUpper(cell.text) || breadcrumb.row === 0)) {
                ignoreThisRow = false
                ignoreNextRows = false
                columnBackground = "#ffe699"
              }

              // "ct" and "c" are bold
              if (breadcrumb.level === 3 && breadcrumb.row === 0) {
                // next row background will be dark orange
                nextColumnBackground = "#ffc000"

                if (cell.col === "5") {
                  cell.col = "4"
                  appendStyle(cell, { fontWeight: 600 })
                }
              }

              if (0 < breadcrumb.row) {
                if (columnBackground) {
                  if (columnBackground === "#ffc000") {
                    nextColumnBackground = "#ffe699"
                  } else if (columnBackground === "#ffe699") {
                    nextColumnBackground = "#eee"
                  }
                  if (2 <= cell.col && cell.col <= 4) {
                    appendStyle(cell, { backgroundColor: columnBackground })
                    // add bold for these two
                    if (columnBackground === "#ffc000" || columnBackground === "#ffe699") {
                      appendStyle(cell, { fontWeight: 600 })
                    }
                    // add center for this one
                    if (columnBackground === "#eee") {
                      appendStyle(cell, { textAlign: "center" })
                    }
                    // consume gray, prepare next row
                    if (columnBackground === "#eee") {
                      columnBackground = "#fff2cd"
                      nextColumnBackground = "#eee"
                    }
                  }
                }
              }

              if (breadcrumb.row === 2) {
                appendBackgroundImage("5")
              }
            }
          }) // cells

          if (ignoreThisRow) {
            appendStyle(row, { display: "none" })
          } else {
            const breadcrumbCell = {
              col: "-1",
              class: "breadcrumbs",
              text: breadcrumb.id
            }
            formatNumber(breadcrumbCell)
            breadcrumbCell.text =
              breadcrumbCell.text + " <span style='font-size: smaller'>" + breadcrumb.row + "</span>"
            row.unshift(breadcrumbCell)
            if (!(ignoreNextRows === true)) {
              breadcrumb.row = breadcrumb.row + 1
              if (is_04_dati_costrutt_CARENZE) {
                // ignore rows after second row of third level breadcrumb until an all uppercase cell is found
                if (breadcrumb.level === 3 && breadcrumb.row === 2) {
                  ignoreNextRows = true
                }
              }
            }
          }

          if (appendImage) {
            row.push(appendImage)
            appendImage = undefined
          }
        }) // rows
      }) // sheets
      return json
    },
    toTrueArray(row, sheet_column_count, sheet_id) {
      sheet_column_count = +sheet_column_count
      let ret = []
      if (sheet_id === "04_dati_costrutt_CARENZE") {
        sheet_column_count = 5
      }
      if (sheet_id === "04_dati_costrutt_VERT_IQM") {
        sheet_column_count = 6
      }
      sheet_column_count = sheet_column_count + 1 // (add breadcrumbs optionally hidden column)
      row = row.filter((e) => e.col < sheet_column_count)
      let index = -1
      let lastCell = undefined
      row.forEach((cell) => {
        for (let i = index; i < cell.col; i++) {
          lastCell = { text: "‌&zwnj;" }
          ret.push(lastCell)
          index++
        }
        if (cell.style) {
          lastCell = { text: cell.text, style: cell.style }
        } else {
          lastCell = { text: cell.text }
        }
        if (cell.colspan) {
          lastCell.colspan = cell.colspan
        }
        if (cell.rowspan) {
          lastCell.rowspan = cell.rowspan
        }
        if (cell.class) {
          lastCell.class = cell.class
        }
        ret.push(lastCell)
        index++
      })

      if (lastCell && index < sheet_column_count) {
        lastCell.colspan = 2 + sheet_column_count - index
      }
      return ret
    }
  },
  computed: {
    slug() {
      return this.$route.params.slug
    },
    datum() {
      return this.units[this.$route.params.slug]
    }
  }
}
</script>
