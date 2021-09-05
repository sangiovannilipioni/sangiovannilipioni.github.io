<template>
  <div class="container-lg">
    <UnitBanner :unit_key="$route.params.slug" :units="units" to="units" />

    <div v-if="units[$route.params.slug].massaged">
      <ul id="myTabs" class="nav nav-tabs">
        <li type="button" class="discreet btn btn-outline-secondary" @click="toggleBreadcrumbs()">
          <font-awesome-icon v-if="showBreadcrumbs" :icon="['fas', 'minus']" />
          <font-awesome-icon v-else :icon="['fas', 'plus']" />
        </li>
        <li class="nav-item" v-for="(sheet, sheet_index) in sheets" :key="sheet_index">
          <a
            :id="`_${sheet_index}`"
            :class="`nav-link ${sheet_index == tabIndex ? 'active' : ''}`"
            :href="`#${sheet.id}`"
            data-bs-placement="top"
            data-bs-toggle="tab"
          >
            {{ sheet.title }}
          </a>
        </li>
      </ul>

      <div class="tab-content mt-2">
        <div
          v-for="(sheet, sheet_index) in sheets"
          :key="sheet_index"
          :class="`tab-pane fade ${sheet_index == tabIndex ? 'show active' : ''}`"
          :id="sheet.id"
        >
          <table class="excel table table-sm table-responsive table-borderless">
            <thead />
            <tbody :class="showBreadcrumbs ? 'breadcrumbs' : ''">
              <tr v-for="(row, row_index) in sheet.rows" :key="row_index" :style="row.style">
                <td
                  v-for="(cell, col_index) in row.cells"
                  :key="col_index"
                  :colspan="cell.colspan"
                  :rowspan="cell.rowspan"
                  :style="cell.style"
                  :title="cell.title"
                  :class="cell.class"
                >
                  <span v-if="cell.html" v-html="cell.html"></span>
                  <span v-else>{{ cell.text }}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            class="card float-end d-inline didascalia text-muted"
            v-if="sheet.name === '04_dati_costrutt_VERT_IQM' || sheet.name === '04_dati_costrutt_CARENZE'"
          >
            <div v-if="sheet.name === '04_dati_costrutt_VERT_IQM'">
              <div>comportamento strutturale</div>
              <div>
                <span class="badge rounded-pill bg-success">A</span>
                <span class="text-success">buono</span>
                <span class="badge rounded-pill bg-warning">B</span>
                <span class="text-warning">medio</span>
                <span class="badge rounded-pill bg-danger">C</span>
                <span class="text-danger">scarso</span>
              </div>
            </div>
            <div>
              <div>stato di conservazione</div>
              <div>
                <span class="badge rounded-pill bg-success">1</span>
                <span class="text-success">buono</span>
                <span class="badge rounded-pill bg-warning">2</span>
                <span class="text-warning">medio</span>
                <span class="badge rounded-pill bg-danger">3</span>
                <span class="text-danger">scarso</span>
                <span class="badge rounded-pill bg-info">-</span>
                <span class="">n/a</span>
              </div>
            </div>
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

.badge.rounded-pill {
  font-family: Courier New, monospace;
}
</style>

<script>
export default {
  data() {
    return {
      title: "",
      tabNodes: [],
      tabIndex: 0,
      showBreadcrumbs: false
    }
  },
  async asyncData({ app, params, error }) {
    let units = {}
    await app.$axios
      .get("/units.json")
      .then(
        (response) => {
          if (!response || !response.data || !response.data[params.slug]) {
            return error({ statusCode: 404 })
          }
          units = response.data
          return app.$axios.get(`/unit/${params.slug}.json`)
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
          units[params.slug].rawData = undefined
          // return error({ statusCode: 404 })
        }
      )
      .catch((err) => err)
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
    sheets() {
      return this.units[this.$route.params.slug].massaged
    }
  },
  created() {
    this.$nextTick(() => {
      this.tabIndex = this.$store.state.tab.tab2
      this.showBreadcrumbs = this.$store.state.tab.breadcrumbs
    })
  },
  beforeDestroy() {
    if (this.tabNodes && Array.isArray(this.tabNodes)) {
      for (let i = 0; i < this.tabNodes.length; i++) {
        this.tabNodes[i].removeEventListener("shown.bs.tab", this.onTabShown)
      }
    }
  },
  mounted() {
    // https://stackoverflow.com/a/42513893/1070215
    this.$nextTick(() => {
      const tabsNode = document.getElementById("myTabs")
      if (tabsNode) {
        this.tabNodes = tabsNode.getElementsByTagName("A")
        if (this.tabNodes && this.tabNodes.length) {
          for (let i = 0; i < this.tabNodes.length; i++) {
            this.tabNodes[i].addEventListener("shown.bs.tab", this.onTabShown)
          }
        }
      }
    })
  },
  methods: {
    toggleBreadcrumbs() {
      this.showBreadcrumbs = !this.showBreadcrumbs
      this.$store.commit("tab/setBreadcrumbs", {
        breadcrumbs: this.showBreadcrumbs
      })
    },
    onTabShown(event) {
      this.tabIndex = parseInt(event.target.id.substring(1))
      this.$store.commit("tab/setTab2", {
        tab2: this.tabIndex
      })
    },
    massageData(json) {
      if (!json) {
        return json
      }
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
        gallery: "#ededed",
        kidnapper: "#eff5e9",
        lightsilver: "#d7d7d7",
        mexicanRed: "#a42424",
        section: "#ededed",
        sectionDarker: "#dddddd",
        sprout: "#c6e0b3",
        white: "#fffff"
      }

      const fixTypos = {
        "stato di conservaz": "stato di conservazione",
        carenzestrutturali: "carenze strutturali",
        IQM: "indice di qualità muraria (IQM)",
        "1:ottimo": "&nbsp;",
        "2:medio": "&nbsp;",
        "3:scarso": "&nbsp;"
      }

      // remove all sheets that have no title
      json = json.filter((sheet) => sheetTitles[sheet.name])

      // for all sheets
      json.forEach((sheet) => {
        // set id & title
        sheet.id = `_${sheet.name.replace(" ", "_")}`
        sheet.title = sheetTitles[sheet.name]
        sheet.columnCount = +sheet.columnCount

        // remove first row
        sheet.rows.shift()

        // helpers
        const is_01_id_edificio = sheet.name === "01_id_edificio"
        const is_02_descriz_edificio = sheet.name === "02_descriz_edificio"
        const is_03_dati_metrici_AB = sheet.name === "03_dati_metrici_AB"
        const is_04_dati_costrutt_VERT_IQM = sheet.name === "04_dati_costrutt_VERT_IQM"
        const is_04_dati_costrutt_CARENZE = sheet.name === "04_dati_costrutt_CARENZE"

        // the mythical breadcrum class
        let breadcrumb = {
          id: undefined,
          row: 0,
          get level() {
            let ret = 0
            if (this.id) {
              ret = 1 + (this.id.match(/\./g) || []).length
            }
            return ret
          }
        }

        // declare row iteration flags
        const nextRow = {
          ignore: undefined,
          color: undefined,
          cellBackground: undefined,
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
          row.cells.forEach((cell, colindex) => {
            // for each cell -------------------------------------------------
            cell.col = +cell.col
            if (typeof cell.text === "undefined") cell.text = ""
            // fix typos
            if (fixTypos[cell.text]) {
              cell.html = fixTypos[cell.text]
            }

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
                  }
                }

                appendStyle(row, { backgroundColor: bgColor })
              }
            }

            // format numbers
            formatNumber(cell)

            // function to instantiate background image cell
            const createImageCell = (column, rowspan) => {
              if (this.units[this.$route.params.slug].inserts[breadcrumb.id]) {
                return {
                  col: column,
                  rowspan: rowspan,
                  html:
                    "<img style='width:120px;' src='https://api.sangiovannilipioni.net/api/v1/image/" +
                    this.units[this.$route.params.slug].inserts[breadcrumb.id] +
                    "' />",
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
                return undefined
              }
              return `<span class="badge rounded-pill ${
                cell.text === "1" || cell.text === "A"
                  ? "bg-success"
                  : cell.text === "2" || cell.text === "B"
                  ? "bg-warning"
                  : cell.text === "3" || cell.text === "C"
                  ? "bg-danger"
                  : "bg-info"
              }" title="1/A:ottimo 2/B:medio 3/C:scarso" 
              onclick="window.scrollTo(0,document.body.scrollHeight);"
              style="font-family: Courier New, monospace; cursor: pointer;">${cell.text}</span>`
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
                cell.html = `<a href="https://www.google.com/maps/search/?api=1&query=${cell.text.replace(
                  " ",
                  ""
                )}" target="_blank">${cell.text}</a>`
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
                nextRow.cellBackground = colorMap.gallery
                appendStyle(cell, { fontWeight: "bold" })
              }
              if (cell.text.match(/^IQMv,/g)) {
                appendStyle(cell, { whiteSpace: "nowrap" })
              }
              if (breadcrumb.row !== 0 && (cell.col === 4 || cell.col === 5 || cell.col === 6)) {
                const badge = createBadge(cell)
                if (badge) {
                  cell.html = badge
                }
              }

              // insert image
              if (cell.text.match(/materiali/g)) {
                nextCell.imageCell = createImageCell(sheet.columnCount, 4) // insert at column 5 with rowspan 4
                // appendStyle(row, { position: "relative" })
                if (nextCell.imageCell) {
                  row.makeSpaceForImage = true
                  nextRow.shrinkColumnCountToMakeSpaceForImage = nextCell.imageCell.rowspan - 1
                  appendStyle(nextCell.imageCell, { backgroundColor: colorMap.white })
                  sheet.hasImage = row.hasImage = true
                }
              }
              // when not on section row
              if (breadcrumb.row !== 0) {
                if (nextCell.background && 1 < cell.col) {
                  appendStyle(cell, { backgroundColor: nextCell.background })
                  // add center for this one
                  if (nextCell.background === colorMap.gallery) {
                    appendStyle(cell, { textAlign: "center" })
                  }

                  // consume gray, prepare next row
                  if (nextCell.background === colorMap.gallery) {
                    nextCell.background = colorMap.kidnapper
                    nextRow.cellBackground = colorMap.gallery
                  }
                }
              }
              if (cell.text.match(/^IQM[vo]/g)) {
                appendStyle(cell, { backgroundColor: colorMap.lightsilver })
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
                const badge = createBadge(cell)
                if (badge) {
                  cell.html = badge
                }
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
              if (cell.text.match(/materiali/g)) {
                nextCell.imageCell = createImageCell(sheet.columnCount, 4) // insert at column 5 with rowspan 4
                if (nextCell.imageCell) {
                  row.makeSpaceForImage = true
                  nextRow.shrinkColumnCountToMakeSpaceForImage = nextCell.imageCell.rowspan - 1
                  appendStyle(nextCell.imageCell, { backgroundColor: colorMap.white })
                  sheet.hasImage = true
                }
              }
              // when not on section row
              if (breadcrumb.row !== 0) {
                if (nextCell.background && 1 < cell.col) {
                  if (nextCell.background === colorMap.amber) {
                    nextRow.cellBackground = colorMap.creamBrulee
                  } else if (nextCell.background === colorMap.creamBrulee) {
                    nextRow.cellBackground = colorMap.gallery
                  }
                  appendStyle(cell, { backgroundColor: nextCell.background })
                  // add bold for these two
                  if (nextCell.background === colorMap.amber || nextCell.background === colorMap.creamBrulee) {
                    appendStyle(cell, { fontWeight: "bold" })
                  }
                  // add center for this one
                  if (nextCell.background === colorMap.gallery) {
                    appendStyle(cell, { textAlign: "center" })
                  }
                  // consume gray, prepare next row
                  if (nextCell.background === colorMap.gallery) {
                    nextCell.background = colorMap.barleyWhite
                    nextRow.cellBackground = colorMap.gallery
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
            breadcrumbCell.html =
              breadcrumbCell.text +
              "<span style='float: right; margin-left: 0.5rem; color: lightgray;'>" +
              breadcrumb.row +
              "</span>"
            row.cells.unshift(breadcrumbCell)

            if (!(nextRow.ignore === true)) {
              breadcrumb.row = breadcrumb.row + 1
              if (is_04_dati_costrutt_CARENZE) {
                // ignore next rows after second row of third level breadcrumb (until an all uppercase cell is found)
                if (breadcrumb.level === 3 && breadcrumb.row === 2) {
                  nextRow.ignore = true
                }
              }
            }
          }

          // consume background image cell
          if (nextCell.imageCell) {
            row.cells.push(nextCell.imageCell)
            nextCell.imageCell = undefined
          }
        }) // rows
      }) // sheets

      // to true table
      json.forEach((sheet) => {
        sheet.rows.forEach((row) => {
          const newCells = this.toTrueArray(row, sheet)
          row.cells = newCells
        })
      })
      return json
    },
    toTrueArray(row, sheet) {
      // helper
      function isVisible(element) {
        return !element.style || !(element.style.display === "none")
      }

      // column count manipulation
      let columnCount = sheet.columnCount
      if (sheet.hasImage) {
        columnCount = columnCount + 1
      }
      if (row.hasImage) {
        // console.log(row)
      }

      let ret = []
      let lastCell = undefined
      let penultimateCell = undefined
      let first = true
      row.cells.forEach((cell) => {
        if (isVisible(row)) {
          if (lastCell) {
            penultimateCell = lastCell
          }
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
            if (lastCell) {
              if (lastCell.col + 1 < cell.col) {
                lastCell.colspan = cell.col - lastCell.col
              }
            }
            ret.push(cell)
            lastCell = cell
          }
        }
      }) // row

      if (lastCell) {
        if (lastCell.col + 1 < columnCount - (row.makeSpaceForImage ? 1 : 0)) {
          lastCell.colspan = +columnCount - lastCell.col - (row.makeSpaceForImage ? 1 : 0)
        }
      }
      return ret
    }
  }
}
</script>
