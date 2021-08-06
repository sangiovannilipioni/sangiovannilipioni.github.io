<template>
  <div class="container">
    <a :href="`https://docs.google.com/spreadsheets/d/${sheetId}/edit#gid=0`" target="_googleSheets">Google Sheets <font-awesome-icon :icon="['fas', 'external-link-alt']" style="margine-left: 0.75rem;"/></a>
    <hr>
    <table >
      <tr v-for="datum in data" v-bind:key="datum.index">
        <td>{{ datum.key }}</td>
        <td>{{ datum.value }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sheetId: '1eYXlAjh7mOs1j6B3S53tk-FHlBpM3Y9jkhdVDim3eYg',
      data: undefined
    }
  },
  methods: {
    parseSheet (sheetId, sheetName = null) {
      return this.$gsparser.parse(sheetId, sheetName)
    }
  },
  async mounted () {
    const res = await this.parseSheet(this.sheetId)

    let index = 0;
    this.data = res.map(obj => {
      var rObj = {};
      rObj.index = index;
      rObj.key = obj['edificio '];
      rObj.value = obj['%'];
      index = index + 1;
      return rObj;
    });
  } /*,
  async asyncData({ $content, params }) {
    console.log($content, params);
    const building = await $content("case", params.slug).fetch();

    return { building, qwe:"qwe"};
  },*/
};

</script>