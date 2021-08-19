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
                v-for="(col, index3) in toTrueArray(tab.cols, row)"
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
      const sheetTitles= {
        '01_id_edificio' : 'Identificazione',
        '02_descriz_edificio': 'Descrizione',
        '03_dati_metrici_AB': 'Dati metrici'
      }
      json = json.filter((sheet, sheetindex) => sheetindex < 3) ;
      json.forEach((sheet, sheetindex) => {
        sheet.title = sheetTitles[sheet.sheet];
        // remove first row
        sheet.rows.shift();
        // for all rows,
        let nextRowIsRed = false;
        let ignoreNextRow = false;
        let is_03_dati_metrici_AB = (sheet.sheet === '03_dati_metrici_AB');
        sheet.rows.forEach((row, rowindex) => {
          if (ignoreNextRow) {
            row.style = (row.style || "") + "display: none; ";
          }
          if (nextRowIsRed) {
            row.style = (row.style || "") + "color: #a42424; ";
            nextRowIsRed = false;
          }
          if (is_03_dati_metrici_AB && rowindex === 2 && row[0]) {
            row[0].colspan="4";
            return;
          }
          row.forEach((col, colindex) => {
            // if first column is column zero, and is a numeric, style the row with gray background
            if (colindex === 0) {
              if (col.col === "0" && !isNaN(col.text.replace(".", ""))) {
                row.style =
                  (row.style || "") +
                  "background-color: #eee; display: table.row; ";
                ignoreNextRow = false;
              }
            }
            // format numbers
            if (!isNaN(col.text)) {
              // number of decimals ?
              if (col.col !== "0") {
                let num = col.text;
                col.text = parseFloat(num).toFixed(2);
              }
              // if text ends with ".0", remove it
              if (col.text.endsWith(".0")) {
                col.text = col.text.substring(0, col.text.length - 2);
                // if text ends with ".00", remove it
              } else if (col.text.endsWith(".00")) {
                col.text = col.text.substring(0, col.text.length - 3);
              }
            }
            // next row will be red
            if (
              col.text === "CARATTERISTICHE EDIFICIO" ||
              col.text === "estremità"
            ) {
              nextRowIsRed = true;
            }
            // ignore next rows until new paragraph
            if (col.text === "nr. vani" || col.text === "Superficie totale") {
              ignoreNextRow = true;
            }
          });
        });
      });
      return json;
    },
    toTrueArray(col_count, row) {
      let ret = [];
      let index = 0;
      let colspanned = false;
      row.forEach((element) => {
        for (let i = index; i < element.col; i++) {
          ret.push({text:""});
          index++;
        }
        if (element.colspan) {
          colspanned = true;
          ret.push({text:element.text, colspan:element.colspan});
          return;
        } else {
          ret.push({text:element.text});
        }
        index++;
      });
      if (!colspanned) {
        for (let i = index; i <= col_count; i++) {
          ret.push({text:""});
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
