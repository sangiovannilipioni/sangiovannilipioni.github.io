<template>
  <article class="container-fluid">
    <b-tabs content-class="mt-3">
      <b-tab v-for="(tab, index) in data" :key="index" :title="tab.sheet" active>
        <table>
          <tr v-for="(row, index2) in tab.rows" :key="index2" >
            <td >
              {{ row }}
            </td>
          </tr>
        </table>
      </b-tab>
    </b-tabs> 
  </article>
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
};
</script>
