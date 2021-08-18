<template>
  <client-only>
    <article class="container-fluid">
      <b-tabs content-class="mt-3">
        <b-tab
          v-for="(tab, index) in datum"
          :key="index"
          :title="tab.sheet"
          :active="index == 0"
        >
          <table class="table table-sm table-responsive table-borderless">
            <tr
              v-for="(row, index2) in tab.rows"
              :key="index2"
              :style="row.style"
            >
              <td
                v-for="(col, index3) in toArray(tab.cols, row)"
                :key="index3"
                :style="col.style"
              >
                {{ col }}
              </td>
            </tr>
          </table>
        </b-tab>
      </b-tabs>
    </article>
  </client-only>
</template>

<style lang="scss">
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
      json.forEach((sheet) => {
        // remove first row
        sheet.rows.shift();
        // for all rows,
        let nextRowIsRed = false;
        let ignoreNextRow = false;
        sheet.rows.forEach((row) => {
          if (ignoreNextRow) {
            row.style = (row.style || "") + "display: none; ";
          }
          if (nextRowIsRed) {
            row.style = (row.style || "") + "color: #a42424; ";
            nextRowIsRed = false;
          }
          // for all cols,
          row.forEach((col, index) => {
            // if first column is column zero, and is a numeric, style the row with gray background
            if (index === 0) {
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
    toArray(cols, row) {
      let ret = [];
      let index = 0;
      row.forEach((element) => {
        for (let i = index; i < element.col; i++) {
          ret.push("");
          index++;
        }
        ret.push(element.text);
        index++;
      });
      for (let i = index; i <= cols; i++) {
        ret.push("");
        index++;
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
