<template>
  <client-only>
    <article class="container">
      <h4 id="title">
        {{ title }}
        <span class="text-muted" style="font-size: smaller">[{{ $route.params.slug }}]</span>
      </h4>
      <ul role="tablist" class="nav nav-tabs">
        <div type="button" class="discretButton btn btn-outline-secondary" @click="showBreadcrumbs = !showBreadcrumbs">
          <font-awesome-icon v-if="showBreadcrumbs" :icon="['fas', 'minus']" />
          <font-awesome-icon v-else :icon="['fas', 'plus']" />
        </div>
        <li class="nav-item" v-for="(sheet, sheet_index) in datum" :key="sheet_index">
          <a :href="`#${sheet.id}`" data-toggle="tab" :class="`nav-link ${sheet_index == 0 ? 'active' : ''}`">
            {{ sheet.title }}
          </a>
        </li>
      </ul>
      <div class="tab-content mt-3" id="myTabContent">
        <div
          v-for="(sheet, sheet_index) in datum"
          :class="`tab-pane fade ${sheet_index == 0 ? 'show active' : ''}`"
          :id="sheet.id"
          :key="sheet_index"
        >
          <table class="excel table table-sm table-responsive table-borderless">
            <tbody>
              <tr v-for="(row, row_index) in sheet.rows" :key="row_index" :style="row.style">
                <td
                  v-for="(cell, col_index) in toTrueArray(row, sheet.columnCount, sheet.sheet)"
                  :class="showBreadcrumbs ? cell.class : ''"
                  :colspan="cell.colspan"
                  :key="col_index"
                  :rowspan="cell.rowspan"
                  :style="cell.style"
                  v-html="cell.html"
                ></td>
              </tr>
            </tbody>
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

.discretButton {
  border: none;
  color: lightgray;
  font-size: smaller;
  margin: auto 0.25rem;
  padding: 0 0.25rem;
}

table.excel {
  overflow-y: hidden;

  td:nth-child(1):not(.breadcrumbs) {
    display: none;
  }
  td:nth-child(1).breadcrumbs {
    color: gray;
    font-family: "Courier New", monospace;
    font-size: 12pt;
    white-space: nowrap;
    width: 76px;
  }
}
#_04_dati_costrutt_VERT_IQM,
#_04_dati_costrutt_CARENZE {
  td:nth-child(5) {
    white-space: nowrap;
  }
  td:last-child {
    width: 140px;
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
          cell.text = cell.text.replace(/\.0+$/, "").replace(/(\.[1-9]*)0+$/, "$1")
        }
      }

      const sheetTitles = {
        "01_id_edificio": "Identificazione",
        "02_descriz_edificio": "Descrizione",
        "03_dati_metrici_AB": "Dati metrici",
        "04_dati_costrutt_VERT_IQM": "Caratteristiche costruttive muratura",
        "04_dati_costrutt_CARENZE": "Caratteristiche costruttive solai"
      }

      const fixTypos = {
        "stato di conservaz": "stato di conservazione",
        carenzestrutturali: "carenze strutturali"
      }

      // remove all sheets that have no title
      json = json.filter((sheet) => sheetTitles[sheet.sheet])

      // for all sheets
      json.forEach((sheet) => {
        // set id & title
        sheet.id = `_${sheet.sheet.replace(" ", "_")}`
        sheet.title = sheetTitles[sheet.sheet]

        // remove first row
        sheet.rows.shift()

        // helpers
        const is_01_id_edificio = sheet.sheet === "01_id_edificio"
        const is_02_descriz_edificio = sheet.sheet === "02_descriz_edificio"
        const is_03_dati_metrici_AB = sheet.sheet === "03_dati_metrici_AB"
        const is_04_dati_costrutt_VERT_IQM = sheet.sheet === "04_dati_costrutt_VERT_IQM"
        const is_04_dati_costrutt_CARENZE = sheet.sheet === "04_dati_costrutt_CARENZE"

        // the mythical breadcrum class
        let breadcrumb = {
          id: undefined,
          row: 0,
          jpegNameMap: {
            "4.2.1": "4.2.1.jpg",
            "4.2.2": "4.2.2.jpg",
            "4.4.2": "4.4.2_4.4.3.jpg",
            "4.4.3": "4.4.2_4.4.3.jpg",
            "4.4.4": "4.4.4.jpg"
          },
          get level() {
            let ret = 0
            if (this.id) {
              ret = 1 + (this.id.match(/\./g) || []).length
            }
            return ret
          },
          get jpeg() {
            return this.jpegNameMap[this.id]
          }
        }

        // declare row iteration flags
        let ignoreNextRows = undefined
        let nextRowColor = undefined
        let nextColumnBackground = undefined
        let ignoreNextNextColumns = undefined
        // let backgroundImageCellRowSpan = 0

        // for all rows
        sheet.rows.forEach((row, rowindex) => {
          // hide ignored rows
          let ignoreThisRow = ignoreNextRows === true

          // consume row color
          if (nextRowColor) {
            appendStyle(row, { color: nextRowColor })
            nextRowColor = undefined
          }

          // declare cell iteration flags
          let indirizzo = undefined
          // let backgroundImageCell = undefined
          let columnBackground = undefined

          // consume column background color
          if (nextColumnBackground) {
            columnBackground = nextColumnBackground
            nextColumnBackground = undefined
          }

          // for all cols
          row.forEach((cell, colindex) => {
            // for each cell -------------------------------------------------
            cell.col = +cell.col
            // fix typos
            cell.text = fixTypos[cell.text] || cell.text

            // if first column is column zero, and is a numeric : start of section
            if (colindex === 0) {
              if (cell.col === 0 && !isNaN(cell.text.replace(".", ""))) {
                ignoreThisRow = false // always show start of section

                breadcrumb.id = cell.text
                breadcrumb.row = 0

                // style the row with gray background
                let bgColor = "#eee"

                // for 'Carenze' and 'Qualità' sheets, darker gray for 3rd level (e.g. 'x.y.z') very first row
                if (is_04_dati_costrutt_CARENZE || is_04_dati_costrutt_VERT_IQM) {
                  if (breadcrumb.level === 3 && breadcrumb.row === 0) {
                    bgColor = "#ddd"
                    ignoreNextNextColumns = false // reset flag
                  }
                }

                appendStyle(row, { backgroundColor: bgColor })
              }
            }

            // format numbers
            formatNumber(cell)

            /*
            // function to instantiate background image cell
            const createBackgroundImageCell = (rowspan) => {
              if (breadcrumb.jpeg) {
                return {
                  col: "5",
                  rowspan: rowspan,
                  text: "‌&zwnj;",
                  style: "background: center right / contain no-repeat url(/json/jpegs/" + breadcrumb.jpeg + ")"
                }
              }
              return undefined
            }
            */

            // special case 1 -------------------------------------------------
            if (is_01_id_edificio) {
              if (cell.text === "DATI CATASTALI") {
                ignoreNextRows = true
                ignoreThisRow = true
              }
              // calc title
              {
                if (indirizzo) {
                  this.title = cell.text
                  indirizzo = undefined
                }
                if (cell.text === "INDIRIZZO") {
                  indirizzo = cell
                }
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
              /*
              if (ignoreNextNextColumns && 4 < cell.col) {
                appendStyle(cell, { display: "none" })
              }
              */

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
              if (cell.text.match(/[ABC][1234]/g)) {
                columnBackground = "#c6e0b3"
                nextColumnBackground = "#eee"
                appendStyle(cell, { fontWeight: 600 })
              }
              /*
              if (cell.text.match(/materiali/g)) {
                backgroundImageCell = createBackgroundImageCell(4)
                if (backgroundImageCell) {
                  backgroundImageCellRowSpan = 4
                  ignoreNextNextColumns = true
                }
              }
              */
              if (columnBackground && 1 < cell.col) {
                // if not on section row
                if (breadcrumb.row !== 0) {
                  appendStyle(cell, { backgroundColor: columnBackground })
                  // add center for this one
                  if (columnBackground === "#eee") {
                    appendStyle(cell, { textAlign: "center" })
                  }
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
              /*
              if (ignoreNextNextColumns && 4 < cell.col) {
                appendStyle(cell, { display: "none" })
              }
              */

              // stop ignoring rows when meeting full uppercase cell or new section
              if (ignoreThisRow && (isUpper(cell.text) || breadcrumb.row === 0)) {
                ignoreThisRow = false
                ignoreNextRows = false
                columnBackground = "#ffe699"
              }
              if (breadcrumb.level === 3 && breadcrumb.row === 0) {
                // next row background will be dark orange
                nextColumnBackground = "#ffc000"

                if (cell.col === 5) {
                  cell.col = 4
                  // "ct", "c", "-1", "0", etc. are bold
                  appendStyle(cell, { fontWeight: 600 })
                }
              }

              if (breadcrumb.row !== 0) {
                if (columnBackground) {
                  if (columnBackground === "#ffc000") {
                    nextColumnBackground = "#ffe699"
                  } else if (columnBackground === "#ffe699") {
                    nextColumnBackground = "#eee"
                  }
                  if (1 < cell.col) {
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

              /*
              if (breadcrumb.row === 2) {
                ignoreNextNextColumns = true
                backgroundImageCell = createBackgroundImageCell(5)
                if (backgroundImageCell) {
                  backgroundImageCellRowSpan = 5
                }
              }
              */
            }
          }) // cells

          if (ignoreThisRow) {
            appendStyle(row, { display: "none" })
          }

          if (!ignoreThisRow) {
            const breadcrumbCell = {
              col: -1,
              class: "breadcrumbs",
              text: breadcrumb.id
            }
            formatNumber(breadcrumbCell)
            breadcrumbCell.text =
              breadcrumbCell.text +
              "<span style='float: right; margin-left: 0.5rem; color: lightgray;'>" +
              breadcrumb.row +
              "</span>"
            row.unshift(breadcrumbCell)
            if (!(ignoreNextRows === true)) {
              breadcrumb.row = breadcrumb.row + 1
              if (is_04_dati_costrutt_CARENZE) {
                // ignore rows after second row of third level breadcrumb (until an all uppercase cell is found)
                if (breadcrumb.level === 3 && breadcrumb.row === 2) {
                  ignoreNextRows = true
                }
              }
            }
          }

          /*
          // consume background image cell          
          if (backgroundImageCell) {
            row.push(backgroundImageCell)
            backgroundImageCell = undefined
          }

          if (backgroundImageCellRowSpan) {
            row.colspanOffset = backgroundImageCellRowSpan

            backgroundImageCellRowSpan = backgroundImageCellRowSpan - 1
          }
          */
        }) // rows

        sheet.columnCount = +sheet.columnCount + 1 // (add breadcrumbs optionally hidden column)
      }) // sheets
      return json
    },
    toTrueArray(row, sheet_column_count, sheet_sheet) {
      let ret = []
      // const colspanOffset = row.colspanOffset
      let lastCell = undefined
      let first = true
      /*
      {
        const is_04_dati_costrutt_CARENZE = sheet_sheet === "04_dati_costrutt_CARENZE"
        if (is_04_dati_costrutt_CARENZE) {
          sheet_column_count = 5
          console.log("before", row);
          row = row.filter((cell) => {
            return +cell.col <= sheet_column_count
          })
          console.log("after", row);
        }
      }
      */
      row.forEach((cell) => {
        if (cell.col !== -1) {
          if (first) {
            first = false
            if (0 < cell.col) {
              lastCell = {
                col: 0,
                html: "‌&zwnj;"
              }
              ret.push(lastCell)
            }
          }
        }

        if (lastCell) {
          if (1 < cell.col - lastCell.col) {
            lastCell.colspan = cell.col - lastCell.col
          }
        }

        lastCell = { ...cell, ...{ text: undefined, html: cell.text } }
        ret.push(lastCell)
      })
      if (lastCell) {
        if (1 < sheet_column_count - lastCell.col) {
          lastCell.colspan = sheet_column_count - lastCell.col
        }
      }
      return ret
    }
  },
  computed: {
    datum() {
      return this.units[this.$route.params.slug]
    }
  }
}
</script>
