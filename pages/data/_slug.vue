<template>
  <client-only>
    <article class="container-fluid">
      <b-tabs content-class="mt-3">
        <b-tab
          v-for="(tab, index) in data"
          :key="index"
          :title="tab.sheet"
          :active="index == 0"
        >
          <table
            class="
              table
              table-bordered
              table-striped
              table-hover
              table-sm
              table-responsive
            "
          >
            <tr v-for="(row, index2) in tab.rows" :key="index2">
              <td v-for="(col, index3) in toArray(tab.cols, row)" :key="index3">
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
      data: [],
    };
  },
  async fetch() {
    this.data = await fetch("/json/SintesiO2.json").then((res) => res.json());
  },
  fetchOnServer: false,
  fetchKey: 'dugenou',
  methods: {
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
};
</script>
