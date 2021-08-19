<template>
  <client-only>
    <article class="container">
      <b-tabs content-class="mt-3">
        <b-tab
          v-for="(tab, index) in datum"
          :key="index"
          :title="tab.title"
          :active="index == 0"
          :id="'_' + tab.sheet.replace(' ', '_')"
        >
          <table class="table table-sm table-responsive table-borderless">
            <tr
              v-for="(row, index2) in tab.rows"
              :key="index2"
              :style="row.style"
            >
              <td
                v-for="(col, index3) in toTrueArray(tab.cols, row, tab.sheet)"
                :key="index3"
                :style="col.style"
                :colspan="col.colspan"
              >
                {{ col.text }}
              </td>
            </tr>
          </table>
        </b-tab>
      </b-tabs>
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
    text-align: right;
    width: 10%;
  }
  td:nth-child(4) {
    text-align: right;
    width: 10%;
  }
}
</style>

<script>
export default {
  data() {
    return {
      units: {
        O02: {},
        G01: {},
      },
    };
  },
  async fetch() {
    const data = this.massageData(
      await fetch("/json/SintesiO2.json").then((res) => res.json())
    );
    this.units[this.$route.params.slug] = data;
  },
  fetchOnServer: false,
  fetchKey: "dugenou",
  methods: {
    massageData(json) {
      function appendStyle(elem, style) {
        elem.style = { ...elem.style, ...style };
      }

      function isUpper(str) {
        return !/[a-z]/.test(str) && /[A-Z]/.test(str);
      }

      function formatNumber(col) {
        if (!isNaN(col.text)) {
          if (col.col !== "0") {
            col.text = parseFloat(col.text).toFixed(2);
          }
          // if text ends with ".00", remove it
          if (col.text.endsWith(".00")) {
            col.text = col.text.substring(0, col.text.length - 3);
            // if text ends with ".0", remove it
          } else if (col.text.endsWith(".0")) {
            col.text = col.text.substring(0, col.text.length - 2);
          }
        }
      }

      const sheetTitles = {
        "01_id_edificio": "Identificazione",
        "02_descriz_edificio": "Descrizione",
        "03_dati_metrici_AB": "Dati metrici",
        "04_dati_costrutt_CARENZE": "Carenze costruttive",
        "04_dati_costrutt_VERT_IQM": "Qualità muraria",
      };

      // remove all sheets that have no title
      json = json.filter((sheet) => sheetTitles[sheet.sheet]);

      // for all sheets
      json.forEach((sheet) => {
        // set title
        sheet.title = sheetTitles[sheet.sheet];

        // remove first row
        sheet.rows.shift();

        let is_03_dati_metrici_AB = sheet.sheet === "03_dati_metrici_AB";
        let is_04_dati_costrutt_CARENZE = sheet.sheet === "04_dati_costrutt_CARENZE";
        let is_04_dati_costrutt_VERT_IQM = sheet.sheet === "04_dati_costrutt_VERT_IQM";

        let nextRowTextIsRed = false;
        let nextColumnBackground = undefined;
        let columnBackground = undefined;
        let ignoreNextRow = false;
        let newColAfterSolaioDiPiano = undefined;

        // for all rows
        sheet.rows.forEach((row, rowindex) => {
          if (ignoreNextRow) {
            appendStyle(row, { display: "none" });
          }
          if (nextRowTextIsRed) {
            appendStyle(row, { color: "#a42424" });
            nextRowTextIsRed = false;
          }
          if (is_03_dati_metrici_AB && rowindex === 2 && row[0]) {
            row[0].colspan = "4";
            return;
          }
          if (nextColumnBackground) {
            columnBackground = nextColumnBackground;
          }
          if (nextColumnBackground) {
            if (nextColumnBackground === "#ffc000") {
              nextColumnBackground = "#ffe699";
              ignoreNextRow = true;
            } else if (nextColumnBackground === "#ffe699") {
              nextColumnBackground = "#eee";
            } else if (!ignoreNextRow) {
              nextColumnBackground = undefined;
            }
          }

          const fixTypos = {
            "stato di conservaz": "stato di conservazione",
            "carenzestrutturali": "carenze strutturali",
          };

          if (is_04_dati_costrutt_CARENZE) {
            let piano = undefined;
            // for all cols
            row.forEach((element) => {
              if (element.text === "ct" || element.text === "c") {
                appendStyle(element, { fontWeight: 600 });
              }

              if (element.text === "solaio di piano") {
                newColAfterSolaioDiPiano = {
                  col: "3",
                  text: "",
                  style: "font-weight: 600;",
                };
              }

              if (piano) {
                if (newColAfterSolaioDiPiano) {
                  newColAfterSolaioDiPiano.text = element.text;
                  formatNumber(newColAfterSolaioDiPiano);
                  newColAfterSolaioDiPiano = undefined;
                }
                piano = undefined;
              }

              if (element.text === "piano") {
                piano = element;
                appendStyle(piano, { visibility: "hidden" });
              }
            });

            if (newColAfterSolaioDiPiano) {
              row.push(newColAfterSolaioDiPiano);
            }
          }

          // for all cols,
          row.forEach((col, colindex) => {

            // fix typos
            col.text = fixTypos[col.text] || col.text;

            // special case I
            if (is_04_dati_costrutt_CARENZE) {
              if (ignoreNextRow && isUpper(col.text)) {
                appendStyle(row, { display: "table.row" });
                ignoreNextRow = false;
                columnBackground = "#ffe699";
              }
              if (columnBackground && 1 <= col.col && col.col <= 2) {
                appendStyle(col, { backgroundColor: columnBackground });
                // add bold for these two
                if (
                  columnBackground === "#ffc000" ||
                  columnBackground === "#ffe699"
                ) {
                  appendStyle(col, { fontWeight: 600 });
                }
                // add center for this
                if (columnBackground === "#eee") {
                  appendStyle(col, { textAlign: "center" });
                }

                {
                  if (columnBackground === "#eee") {
                    columnBackground = "#fff2cd";
                  } else if (columnBackground === "#fff2cd") {
                    columnBackground = "#eee";
                  }
                }
              }
            }

            // special cases II
            if (is_04_dati_costrutt_VERT_IQM) {
              if (
                col.text.match(/pareti interne/g) ||
                col.text.match(/pareti esterne/g)
              ) {
                columnBackground = undefined;
                appendStyle(col, { fontWeight: 600 });
              }
              if (col.text === "A1" || col.text === "A2") {
                columnBackground = "#c6e0b3";
                nextColumnBackground = "#eee";
              }

              if (columnBackground && 1 <= col.col && col.col <= 2) {
                appendStyle(col, { backgroundColor: columnBackground });

                // add center for this
                if (columnBackground === "#eee") {
                  appendStyle(col, { textAlign: "center" });
                }

                {
                  if (columnBackground === "#eee") {
                    columnBackground = "#eff5e9";
                  } else if (columnBackground === "#eff5e9") {
                    columnBackground = "#eee";
                  }
                }
              }
            }

            // if first column is column zero, and is a numeric, style the row with gray background
            if (colindex === 0) {
              if (col.col === "0" && !isNaN(col.text.replace(".", ""))) {
                let bgColor = "#eee";

                // for 'Carenze' and 'Qualità' sheets, darker gray for 3rd level rows (of the form 'x.y.z', that is, with two dots)
                if (
                  is_04_dati_costrutt_CARENZE ||
                  is_04_dati_costrutt_VERT_IQM
                ) {
                  var dots = (col.text.match(/\./g) || []).length;
                  if (dots == 2) {
                    bgColor = "#ddd";
                  }
                }

                appendStyle(row, {
                  backgroundColor: bgColor,
                  display: "table.row",
                });

                // new section : reset flags
                ignoreNextRow = false;
                nextColumnBackground = undefined;
                columnBackground = undefined;
              }
            }

            // format numbers
            formatNumber(col);

            // next row text will be red
            if (
              col.text === "CARATTERISTICHE EDIFICIO" ||
              col.text === "estremità"
            ) {
              nextRowTextIsRed = true;
            }

            // next row background will be dark orange
            if (col.text.match(/4\.4\.\d/g)) {
              nextColumnBackground = "#ffc000";
            }

            if (
              col.col <= 2 &&
              (col.text.startsWith("codice id. elementi costruttivi") ||
                col.text === "IQMv" ||
                col.text === "IQMo,fp" ||
                col.text === "IQMo,np")
            ) {
              appendStyle(row, { display: "none" });
            }

            // ignore next rows until new section
            if (col.text === "nr. vani" || col.text === "Superficie totale") {
              ignoreNextRow = true;
            }
          });
        });
      });
      return json;
    },
    toTrueArray(col_count, row, sheet) {
      let ret = [];
      let index = 0;
      let colspanned = false;
      if (sheet === "04_dati_costrutt_CARENZE") {
        row = row.filter((e) => e.col < 4);
      }
      if (sheet === "04_dati_costrutt_VERT_IQM") {
        row = row.filter((e) => e.col < 3);
      }
      row.forEach((element) => {
        for (let i = index; i < element.col; i++) {
          ret.push({});
          index++;
        }
        if (element.colspan) {
          colspanned = true;
          ret.push({
            text: element.text,
            colspan: element.colspan,
            style: element.style,
          });
          return;
        } else {
          ret.push({ text: element.text, style: element.style });
        }
        index++;
      });
      if (!colspanned) {
        for (let i = index; i <= col_count; i++) {
          ret.push({});
          index++;
        }
      }
      return ret;
    },
  },
  computed: {
    slug() {
      return this.$route.params.slug;
    },
    datum() {
      return this.units[this.$route.params.slug];
    },
  },
};
</script>
