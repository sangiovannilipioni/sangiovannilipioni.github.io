<template>
  <div class="container">
    <div class="container d-flex" style="margin-bottom: 0.5rem">
      <div class="flex-grow-1" style="margin: auto">
        <nuxt-link :to="localePath(`/units/${slug}`)" class="btn btn-outline-secondary btn-sm" target="_self">
          {{ $t("piantina") }}
        </nuxt-link>
      </div>
    </div>
    <h4 id="title">
      {{ title }}
      <span class="text-muted" style="font-size: smaller">[{{ $route.params.slug }}]</span>
    </h4>
    <ul class="nav nav-tabs">
      <div type="button" class="discreet btn btn-outline-secondary" @click="showBreadcrumbs = !showBreadcrumbs">
        <font-awesome-icon v-if="showBreadcrumbs" :icon="['fas', 'minus']" />
        <font-awesome-icon v-else :icon="['fas', 'plus']" />
      </div>
      <li class="nav-item" v-for="(sheet, sheet_index) in datum" :key="sheet_index">
        <a
          :class="`nav-link ${sheet_index == 0 ? 'active' : ''}`"
          :href="`#${sheet.id}`"
          data-placement="top"
          data-toggle="tab"
        >
          {{ sheet.title }}
        </a>
      </li>
    </ul>
    <div class="tab-content mt-2">
      <div
        v-for="(sheet, sheet_index) in datum"
        :key="sheet_index"
        :class="`tab-pane fade ${sheet_index == 0 ? 'show active' : ''}`"
        :id="sheet.id"
      >
        <table class="excel table table-sm table-responsive table-borderless">
          <thead />
          <tbody :class="showBreadcrumbs ? 'breadcrumbs' : ''">
            <tr v-for="(row, row_index) in sheet.rows" :key="row_index" :style="row.style">
              <td
                v-for="(cell, col_index) in toTrueArray(row, sheet)"
                :key="col_index"
                :colspan="cell.colspan"
                :rowspan="cell.rowspan"
                :style="cell.style"
                :title="cell.title"
                :class="cell.class"
                v-html="cell.html"
              ></td>
            </tr>
          </tbody>
        </table>
        <div
          class="float-right didascalia text-muted"
          v-if="sheet.sheet === '04_dati_costrutt_VERT_IQM' || sheet.sheet === '04_dati_costrutt_CARENZE'"
        >
          <div>stato di conservazione</div>
          <div>
            <span class="badge badge-pill badge-success">1</span>
            <span class="text-success">buono</span>
            <span class="badge badge-pill badge-warning">2</span>
            <span class="text-warning">medio</span>
            <span class="badge badge-pill badge-danger">3</span>
            <span class="text-danger">scarso</span>
          </div>
          <div>comportamento strutturale</div>
          <div>
            <span class="badge badge-pill badge-success">A</span>
            <span class="text-success">buono</span>
            <span class="badge badge-pill badge-warning">B</span>
            <span class="text-warning">medio</span>
            <span class="badge badge-pill badge-danger">C</span>
            <span class="text-danger">scarso</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#title {
  text-align: center;
}

.discreet {
  border: none;
  color: lightgray;
  font-size: smaller;
  margin: auto 0.25rem;
  padding: 0 0.25rem;
}

.didascalia {
  background-color: whitesmoke;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
}

table.excel {
  overflow-y: scroll;

  tbody:not(.breadcrumbs) td:first-child {
    display: none;
  }
  tbody.breadcrumbs td:first-child {
    color: gray;
    font-family: "Courier New", monospace;
    font-size: 12pt;
    white-space: nowrap;
    width: 76px;
  }
}

#_03_dati_metrici_AB {
  td:nth-child(5) {
    text-align: right;
    font-family: monospace;
  }
}
</style>

<script>
export default {
  data() {
    return {
      title: "",
      showBreadcrumbs: false
    }
  },
  async asyncData({ app, params, error }) {
    let units = {}
    await app.$axios
      .get("/json/units.json")
      .then(
        (response) => {
          if (!response || !response.data || !response.data[params.slug]) {
            return error({ statusCode: 404 })
          }
          units = response.data
          return app.$axios.get(`/json/${params.slug}.json`)
        },
        (err) => {
          return error({ statusCode: 500 })
        }
      )
      .then(
        (response) => {
          units[params.slug].rawData = response.data
        },
        (err) => {
          return error({ statusCode: 404 })
        }
      )
      .catch((err) => err)
    /*    
    await app.$axios.get("/json/units.json").then(
      (response) => {
        if (!response || !response.data || !response.data[params.slug]) {
          return error({ statusCode: 404 })
        } else {
          units = response.data
          if (!units[params.slug].hasData) {
            units[params.slug].rawData = []
          } else {
            await .then(
              (response) => {
                if (response && response.status === 200) {
                  
                } else {
                  units[params.slug].rawData = []
                }
              },
              (err) => {
                return error({ statusCode: 404 })
              }
            )
          }
        }
      },
      (err) => {
        return error({ statusCode: 500 })
      }
    )
    */
    return { units }
  },
  fetch() {
    const data = this.massageData(this.units[this.$route.params.slug].rawData)
    this.units[this.$route.params.slug].massaged = data
  },
  computed: {
    slug() {
      return this.$route.params.slug
    },
    datum() {
      return this.units[this.$route.params.slug].massaged
    }
  },
  methods: {
    massageData(json) {
      function appendStyle(elem, style) {
        elem.style = { ...elem.style, ...style }
      }

      // https://stackoverflow.com/a/17572933/1070215
      function isUpper(str) {
        return !/[a-z]/.test(str) && /[A-Z]/.test(str)
      }

      function formatNumber(cell) {
        if (!isNaN(cell.text)) {
          if (cell.col !== 0) {
            cell.text = parseFloat(cell.text).toFixed(2)
          }
          // remove trailing zeroes
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

      // for weird color names, cf. https://chir.ag/projects/name-that-color
      // for official color name, cf. https://shallowsky.com/colormatch/index.php
      const colorMap = {
        amber: "#ffc000",
        barleyWhite: "#fff2cd",
        creamBrulee: "#ffe699",
        kidnapper: "#eff5e9",
        leftRowHeader: "#ededed",
        mexicanRed: "#a42424",
        section: "#ededed",
        sectionDarker: "#dddddd",
        sprout: "#c6e0b3"
      }

      const fixTypos = {
        "stato di conservaz": "stato di conservazione",
        carenzestrutturali: "carenze strutturali",
        IQM: "indice di qualità muraria"
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
        const nextRow = {
          ignore: undefined,
          color: undefined,
          cellBackground: undefined,
          ignoreTrailingColumns: 0,
          shrinkColumnCountToMakeSpaceForImage: 0
        }

        // for all rows
        sheet.rows.forEach((row, rowindex) => {
          // hide ignored rows
          let ignoreThisRow = nextRow.ignore === true

          // consume row color
          if (nextRow.color) {
            appendStyle(row, { color: nextRow.color })
            nextRow.color = undefined
          }

          // declare cell iteration flags
          const nextCell = {
            indirizzo: undefined,
            imageCell: undefined,
            background: undefined
          }

          // consume next row cell background color
          if (nextRow.cellBackground) {
            nextCell.background = nextRow.cellBackground
            nextRow.cellBackground = undefined
          }

          if (nextRow.shrinkColumnCountToMakeSpaceForImage) {
            row.makeSpaceForImage = true

            nextRow.shrinkColumnCountToMakeSpaceForImage = nextRow.shrinkColumnCountToMakeSpaceForImage - 1
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
                let bgColor = colorMap.section

                // for 'Carenze' and 'Qualità' sheets, darker gray for 3rd level (e.g. 'x.y.z') very first row
                if (is_04_dati_costrutt_CARENZE || is_04_dati_costrutt_VERT_IQM) {
                  if (breadcrumb.level === 3 && breadcrumb.row === 0) {
                    bgColor = colorMap.sectionDarker
                    nextRow.ignoreTrailingColumns = 0 // reset
                  }
                }

                appendStyle(row, { backgroundColor: bgColor })
              }
            }

            // format numbers
            formatNumber(cell)

            // function to instantiate background image cell
            const createImageCell = (column, rowspan) => {
              if (breadcrumb.jpeg) {
                return {
                  col: column,
                  rowspan: rowspan,
                  text: "<img style='width:120px;' src='/json/jpegs/" + breadcrumb.jpeg + "'>",
                  style: {
                    padding: "1rem 0 1rem 1rem",
                    verticalAlign: "middle"
                  }
                }
              }
              return undefined
            }

            // function to create badge
            const createBadge = (cell) => {
              if (!cell.text.match(/^[ABC123\-]$/g)) {
                return cell.text
              }
              return `<a class="badge badge-pill ${
                cell.text === "1" || cell.text === "A"
                  ? "badge-success"
                  : cell.text === "2" || cell.text === "B"
                  ? "badge-warning"
                  : cell.text === "3" || cell.text === "C"
                  ? "badge-danger"
                  : "d-none"
              }" title="1/A:ottimo 2/B:medio 3/C:scarso" onclick="window.scrollTo(0,document.body.scrollHeight);">${
                cell.text
              }</a>`
            }

            // special case 1 -------------------------------------------------
            if (is_01_id_edificio) {
              if (cell.text.match(/^DATI CATASTALI$/g)) {
                nextRow.ignore = true
                ignoreThisRow = true
              }
              // google maps coordinates
              // https://stackoverflow.com/a/3518546/1070215
              if (cell.text.match(/^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/g)) {
                cell.text = `<a href="https://www.google.com/maps/search/?api=1&query=${cell.text}" target="_blank">${cell.text}</a>`
              }
              // calc title
              {
                if (nextCell.indirizzo) {
                  this.title = cell.text
                  nextCell.indirizzo = undefined
                }
                if (cell.text === "INDIRIZZO") {
                  nextCell.indirizzo = cell
                }
              }
            }

            // special case 2 -------------------------------------------------
            else if (is_02_descriz_edificio) {
              // next row text will be red (the mexican kind of)
              if (cell.text.match(/^(CARATTERISTICHE EDIFICIO|estremità)$/g)) {
                nextRow.color = colorMap.mexicanRed
              }
            }

            // special case 4 -------------------------------------------------
            else if (is_04_dati_costrutt_VERT_IQM) {
              if (cell.col <= 3 && cell.text.match(/(codice id. elementi costruttivi|IQMv|IQMo,fp|IQMo,np)/g)) {
                ignoreThisRow = true
              }
              if (cell.text.match(/pareti (interne|esterne)/g)) {
                nextCell.background = undefined
                appendStyle(cell, { fontWeight: "bold" })
              }
              if (cell.text.match(/CATEGORIA/g)) {
                ignoreThisRow = true
              }
              if (cell.text.match(/^[ABC][123]$/g)) {
                nextCell.background = colorMap.sprout
                nextRow.cellBackground = colorMap.leftRowHeader
                appendStyle(cell, { fontWeight: "bold" })
              }
              if (cell.text.match(/^IQMv,/g)) {
                appendStyle(cell, { whiteSpace: "nowrap" })
              }
              if (breadcrumb.row !== 0 && cell.col === 4) {
                cell.text = createBadge(cell)
              }

              // insert image
              if (nextRow.ignoreTrailingColumns && sheet.columnCount <= cell.col + nextRow.ignoreTrailingColumns) {
                appendStyle(cell, { display: "none" })
              }
              if (cell.text.match(/materiali/g)) {
                nextCell.imageCell = createImageCell(5, 4) // insert at column 5 with rowspan 4
                appendStyle(row, { position: "relative" })
                if (nextCell.imageCell) {
                  nextRow.shrinkColumnCountToMakeSpaceForImage = nextCell.imageCell.rowspan - 1
                  nextRow.ignoreTrailingColumns = 3
                }
              }
              // when not on section row
              if (breadcrumb.row !== 0) {
                if (nextCell.background && 1 < cell.col) {
                  appendStyle(cell, { backgroundColor: nextCell.background })
                  // add center for this one
                  if (nextCell.background === colorMap.leftRowHeader) {
                    appendStyle(cell, { textAlign: "center" })
                  }

                  // consume gray, prepare next row
                  if (nextCell.background === colorMap.leftRowHeader) {
                    nextCell.background = colorMap.kidnapper
                    nextRow.cellBackground = colorMap.leftRowHeader
                  }
                }
              }
            }

            // special case 5 -------------------------------------------------
            else if (is_04_dati_costrutt_CARENZE) {
              // stop ignoring rows when meeting full uppercase cell or new section
              if (ignoreThisRow && (isUpper(cell.text) || breadcrumb.row === 0)) {
                ignoreThisRow = false
                nextRow.ignore = false
                nextCell.background = colorMap.creamBrulee
              }
              if (cell.text.match(/(1\:ottimo|2\:medio|3\:scarso)/g)) {
                appendStyle(cell, { display: "none" })
              }
              if (breadcrumb.row !== 0 && cell.col === 4) {
                cell.text = createBadge(cell)
              }
              if (breadcrumb.level === 3 && breadcrumb.row === 0) {
                // next row background will be dark orange
                nextRow.cellBackground = colorMap.amber

                if (cell.col === 5) {
                  // "ct", "c", "-1", "0", etc. are bold
                  appendStyle(cell, { fontWeight: "bold", textAlign: "right" })
                }
              }
              // insert image
              if (nextRow.ignoreTrailingColumns && sheet.columnCount <= cell.col + nextRow.ignoreTrailingColumns) {
                appendStyle(cell, { display: "none" })
              }
              if (cell.text.match(/materiali/g)) {
                nextCell.imageCell = createImageCell(5, 4) // insert at column 5 with rowspan 4
                if (nextCell.imageCell) {
                  nextRow.shrinkColumnCountToMakeSpaceForImage = nextCell.imageCell.rowspan - 1
                  nextRow.ignoreTrailingColumns = 3
                }
              }
              // when not on section row
              if (breadcrumb.row !== 0) {
                if (nextCell.background && 1 < cell.col) {
                  if (nextCell.background === colorMap.amber) {
                    nextRow.cellBackground = colorMap.creamBrulee
                  } else if (nextCell.background === colorMap.creamBrulee) {
                    nextRow.cellBackground = colorMap.leftRowHeader
                  }
                  appendStyle(cell, { backgroundColor: nextCell.background })
                  // add bold for these two
                  if (nextCell.background === colorMap.amber || nextCell.background === colorMap.creamBrulee) {
                    appendStyle(cell, { fontWeight: "bold" })
                  }
                  // add center for this one
                  if (nextCell.background === colorMap.leftRowHeader) {
                    appendStyle(cell, { textAlign: "center" })
                  }
                  // consume gray, prepare next row
                  if (nextCell.background === colorMap.leftRowHeader) {
                    nextCell.background = colorMap.barleyWhite
                    nextRow.cellBackground = colorMap.leftRowHeader
                  }
                }
              }
            }
          }) // cells

          if (ignoreThisRow) {
            appendStyle(row, { display: "none" })
          }

          if (!ignoreThisRow) {
            const breadcrumbCell = {
              col: -1,
              text: breadcrumb.id
            }
            formatNumber(breadcrumbCell)
            breadcrumbCell.text =
              breadcrumbCell.text +
              "<span style='float: right; margin-left: 0.5rem; color: lightgray;'>" +
              breadcrumb.row +
              "</span>"
            row.unshift(breadcrumbCell)
            if (!(nextRow.ignore === true)) {
              breadcrumb.row = breadcrumb.row + 1
              if (is_04_dati_costrutt_CARENZE) {
                // ignore rows after second row of third level breadcrumb (until an all uppercase cell is found)
                if (breadcrumb.level === 3 && breadcrumb.row === 2) {
                  nextRow.ignore = true
                }
              }
            }
          }

          // consume background image cell
          if (nextCell.imageCell) {
            row.push(nextCell.imageCell)
            nextCell.imageCell = undefined
          }
        }) // rows

        sheet.columnCount = +sheet.columnCount + 1 // (add breadcrumbs optionally hidden column)
      }) // sheets
      return json
    },
    toTrueArray(row, sheet) {
      // helper
      function isVisible(element) {
        return !element.style || !(element.style.display === "none")
      }

      // column count manipulation
      let columnCount = sheet.columnCount
      const is_04_dati_costrutt_CARENZE = sheet.sheet === "04_dati_costrutt_CARENZE"
      const is_04_dati_costrutt_VERT_IQM = sheet.sheet === "04_dati_costrutt_VERT_IQM"
      if (is_04_dati_costrutt_VERT_IQM) {
        columnCount = 6
      }
      if (is_04_dati_costrutt_CARENZE) {
        columnCount = 6
      }

      let ret = []
      let lastCell = undefined
      let first = true
      row.forEach((cell) => {
        if (isVisible(row)) {
          if (cell.col !== -1) {
            // not a breadcrumb cell
            if (first) {
              first = false
              // first cell is not at col zero : add a void first cell at col zero
              if (0 < cell.col) {
                lastCell = {
                  col: 0,
                  html: "‌&zwnj;"
                }
                ret.push(lastCell)
              }
            }
          }
          if (isVisible(cell)) {
            if (cell.col < columnCount + (row.makeSpaceForImage ? -1 : 0)) {
              if (lastCell) {
                if (lastCell.col + 1 < cell.col) {
                  lastCell.colspan = cell.col - lastCell.col
                }
              }

              lastCell = { ...cell, ...{ text: undefined, html: cell.text } }
              ret.push(lastCell)
            }
          }
        }
      }) // row
      if (lastCell) {
        if (row.makeSpaceForImage) {
          if (lastCell.col + 1 < columnCount - 1) {
            lastCell.colspan = columnCount - 1 - lastCell.col
          }
          console.log(row[0].text, lastCell.col, lastCell.colspan, columnCount)
        } else {
          if (lastCell.col + 1 < columnCount) {
            lastCell.colspan = columnCount - lastCell.col
          }
        }
      }
      return ret
    }
  }
}
</script>
