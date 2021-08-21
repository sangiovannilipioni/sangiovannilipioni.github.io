<template>
  <client-only>
    <article class="container">
      <h4 id="title" style="text-align: center">
        {{ title }}
        <span class="text-muted" style="font-size: smaller">[{{ $route.params.slug }}]</span>
      </h4>
      <ul role="tablist" class="nav nav-tabs">
        <li
          role="presentation"
          class="nav-item"
          v-for="(sheet, sheet_index) in datum"
          :key="sheet_index"
          :id="`_${sheet_index}`"
        >
          <a
            role="tab"
            :href="`#_${sheet.sheet.replace(' ', '_')}`"
            target="_self"
            data-toggle="tab"
            :class="`nav-link ${sheet_index == 0 ? 'active' : ''}`"
          >
            {{ sheet.title }}
          </a>
        </li>
      </ul>
      <div class="tab-content mt-3" id="myTabContent">
        <div
          :class="`tab-pane fade ${sheet_index == 0 ? 'show active' : ''}`"
          role="tabpanel"
          v-for="(sheet, sheet_index) in datum"
          :key="sheet_index"
          :id="'_' + sheet.sheet.replace(' ', '_')"
        >
          <!-- :id="`_${sheet_index}`" -->
          <table class="table table-sm table-responsive table-borderless">
            <tr v-for="(row, row_index) in sheet.rows" :key="row_index" :style="row.style">
              <td
                v-for="(cell, col_index) in toTrueArray(row, sheet.columnCount, sheet.sheet)"
                :key="col_index"
                :style="cell.style"
                :colspan="cell.colspan"
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
td:nth-child(1) {
  width: 5%;
}
#_02_descriz_edificio td:nth-child(2) {
  text-align: right;
}
#_03_dati_metrici_AB {
  td:nth-child(3) {
    width: 5%;
  }
  td:nth-child(4) {
    /* text-align: right; */
    width: 5%;
  }
  td:nth-child(5) {
    text-align: right;
    width: 5%;
  }
}
#_04_dati_costrutt_VERT_IQM {
  td:nth-child(5) {
    width: 25%;
  }
}
</style>

<script>
export default {
  data() {
    return {
      title: "",
      units: {
        O02: {},
        G01: {}
      }
    }
  },
  async fetch() {
    const data = this.massageData(await fetch("/json/Sintesi_O2_v2.json").then((res) => res.json()))
    // const data = await fetch("/json/Sintesi_O2_v2.json").then((res) => res.json())
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
          // if text ends with ".00", remove it
          if (cell.text.endsWith(".00")) {
            cell.text = cell.text.substring(0, cell.text.length - 3)
            // if text ends with ".0", remove it
          } else if (cell.text.endsWith(".0")) {
            cell.text = cell.text.substring(0, cell.text.length - 2)
          }
        }
      }

      const sheetTitles = {
        "01_id_edificio": "Identificazione",
        "02_descriz_edificio": "Descrizione",
        "03_dati_metrici_AB": "Dati metrici" /*,
        "04_dati_costrutt_CARENZE": "Carenze costruttive" */,
        "04_dati_costrutt_VERT_IQM": "Qualità muraria"
      }

      // remove all sheets that have no title
      json = json.filter((sheet) => sheetTitles[sheet.sheet])

      // for all sheets
      json.forEach((sheet) => {
        // set title
        sheet.title = sheetTitles[sheet.sheet]

        // remove first row
        sheet.rows.shift()

        let is_01_id_edificio = sheet.sheet === "01_id_edificio"
        let is_02_descriz_edificio = sheet.sheet === "02_descriz_edificio"
        let is_03_dati_metrici_AB = sheet.sheet === "03_dati_metrici_AB"
        let is_04_dati_costrutt_CARENZE = sheet.sheet === "04_dati_costrutt_CARENZE"
        let is_04_dati_costrutt_VERT_IQM = sheet.sheet === "04_dati_costrutt_VERT_IQM"

        let ignoreRow = false
        let rowColor = undefined
        let nextColumnBackground = undefined
        let columnBackground = undefined

        let breadcrumb = {
          id: undefined,
          row: 0,
          getLevel: () => {
            if (!this.id) return 0
            return (this.id.match(/\./g) || []).length
          }
        }

        // for all rows
        sheet.rows.forEach((row, rowindex) => {
          // hide ignored rows
          if (ignoreRow) {
            appendStyle(row, { display: "none" })
          }
          // consume row color
          if (rowColor) {
            appendStyle(row, { color: rowColor })
            rowColor = undefined
          }
          // consume column background color
          if (nextColumnBackground) {
            columnBackground = nextColumnBackground
            nextColumnBackground = undefined
          }

          const fixTypos = {
            "stato di conservaz": "stato di conservazione",
            carenzestrutturali: "carenze strutturali"
          }

          let indirizzo = undefined
          let appendImage = false
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

                // for 'Carenze' and 'Qualità' sheets, darker gray for 3rd level rows (of the form 'x.y.z', that is, with two dots)
                if (is_04_dati_costrutt_CARENZE || is_04_dati_costrutt_VERT_IQM) {
                  if (breadcrumb.getLevel() === 2 && breadcrumb.row === 0) {
                    bgColor = "#ddd"
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

            if (
              cell.col <= 3 &&
              (cell.text.startsWith("codice id. elementi costruttivi") ||
                cell.text === "IQMv" ||
                cell.text === "IQMo,fp" ||
                cell.text === "IQMo,np")
            ) {
              appendStyle(row, { display: "none" })
            }

            // special case 1 -------------------------------------------------
            if (is_01_id_edificio) {
              if (cell.text === "DATI CATASTALI") {
                ignoreRow = true
                appendStyle(row, { display: "none" })
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
                rowColor = "#a42424"
              }
            }
            // special case 4 -------------------------------------------------
            else if (is_04_dati_costrutt_VERT_IQM) {
              if (cell.text.match(/pareti (interne|esterne)/g)) {
                columnBackground = undefined
                appendStyle(cell, { fontWeight: 600 })
              }
              if (cell.text.match(/CATEGORIA/g)) {
                appendStyle(row, { display: "none" })
              }
              if (cell.text.match(/A[1234]/g)) {
                columnBackground = "#c6e0b3"
                nextColumnBackground = "#eee"
                appendStyle(cell, { fontWeight: 600 })
              }
              if (cell.text.match(/materiali/g)) {
                appendImage = true
              }
              if (columnBackground && 2 <= cell.col && cell.col <= 3) {
                if (breadcrumb.getLevel() === 0) {
                  appendStyle(cell, { backgroundColor: columnBackground })
                }

                // add center for this
                if (columnBackground === "#eee") {
                  appendStyle(cell, { textAlign: "center" })
                }
                // loop on backgrounds (until reset section)
                if (columnBackground === "#eee") {
                  columnBackground = "#eff5e9"
                } else if (columnBackground === "#eff5e9") {
                  columnBackground = "#eee"
                }
              }
            }

            // special case 5 -------------------------------------------------
            else if (is_04_dati_costrutt_CARENZE) {
              // "ct" and "c" are bold
              if (breadcrumb.getLevel() === 2 && breadcrumb.row === 0) {
                // next row background will be dark orange
                nextColumnBackground = "#ffc000"

                if (cell.col === "5") {
                  cell.col = "4"
                  appendStyle(cell, { fontWeight: 600 })
                }
              }

              // stop ignoring rows when meeting full uppercase cell
              if (ignoreRow && isUpper(cell.text)) {
                appendStyle(row, { display: "table.row" })
                ignoreRow = false
                columnBackground = "#ffe699"
              }

              if (columnBackground) {
                if (columnBackground === "#ffc000") {
                  nextColumnBackground = "#ffe699"
                  ignoreRow = true
                } else if (columnBackground === "#ffe699") {
                  nextColumnBackground = "#eee"
                } else if (!ignoreRow) {
                  nextColumnBackground = undefined
                }
              }

              if (0 < breadcrumb.row) {
                if (columnBackground && 2 <= cell.col && cell.col <= 4) {
                  appendStyle(cell, { backgroundColor: columnBackground })
                  // add bold for these two
                  if (columnBackground === "#ffc000" || columnBackground === "#ffe699") {
                    appendStyle(cell, { fontWeight: 600 })
                  }
                  // add center for this
                  if (columnBackground === "#eee") {
                    appendStyle(cell, { textAlign: "center" })
                  }
                  // loop on backgrounds (until reset section)
                  if (columnBackground === "#eee") {
                    columnBackground = "#fff2cd"
                    nextColumnBackground = "#eee"
                  }
                }
              }
            }
          }) // cells
          breadcrumb.row = breadcrumb.row + 1
          if (appendImage) {
            row.push({
              col: "4",
              text: "<img src='/json/jpegs/" + breadcrumb.id + ".jpg' class='img-fluid' style='width: 200px; height:auto; position: absolute; right:0; max-width:80%'>",
              style: "position: relative"
            })
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
        sheet_column_count = 5
      } 
      /*
      */
      row = row.filter((e) => e.col < sheet_column_count)
      let index = 0
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
        ret.push(lastCell)
        index++
      })

      if (lastCell && index < sheet_column_count) {
        lastCell.colspan = 1 + sheet_column_count - index
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
