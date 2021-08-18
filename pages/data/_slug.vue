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
            <tr v-for="(row, index2) in tab.rows" :key="index2" :style="row.style">
              <td v-for="(col, index3) in toArray(tab.cols, row)" :key="index3" :style="col.style">
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
        sheet.rows.shift()

        // for all rows, 
        sheet.rows.forEach((row) => {
          const firstcol = row[0];
          // if first column is a numeric, style the row with gray background
          if (firstcol && firstcol.col === "0" && !isNaN(firstcol.text.replace('.','')) ) {
            row.style = "background-color: #eee;"
          }
          // for all cols, 
          row.forEach((col) => {
            // if text is numeric and end with ".0", remove it
            if (!isNaN(col.text) && col.text.endsWith('.0')) {
              col.text = col.text.substring(0, col.text.length - 2);
            }
            // self explanatory
            if (col.text === "EDIFICIO IN AGGREGATO" || col.text === "MONOFAMILIARE") {
              row.style = "color: #a42424;"
            }
          });

        });
        return
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
