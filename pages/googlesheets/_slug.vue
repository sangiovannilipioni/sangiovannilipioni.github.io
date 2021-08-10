<template>
  <div class="container">
    <b-alert v-if="!theUnit" show>
      No Google Sheet associated with <strong>{{ slug }}</strong>
    </b-alert>
    <div v-if="theUnit">
      <a
        v-if="theUnit.sheetId"
        :href="`https://docs.google.com/spreadsheets/d/${theUnit.sheetId}/edit#gid=0`"
        target="_googleSheets"
        ><strong>{{ slug }}</strong> Google Sheet
        <font-awesome-icon
          :icon="['fas', 'external-link-alt']"
          style="margine-left: 0.75rem"
        />
      </a>
      <hr />
      <table>
        <tr v-for="datum in theUnit.data" v-bind:key="datum.index">
          <td>{{ datum.key }}</td>
          <td>{{ datum.value }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      units: {
        A02: {
          sheetId: "1eYXlAjh7mOs1j6B3S53tk-FHlBpM3Y9jkhdVDim3eYg",
          data: undefined,
        },
      },
    };
  },
  computed: {
    slug() {
      return this.$route.params.slug;
    },
    theUnit() {
      return this.units[this.$route.params.slug];
    },
  },
  methods: {
    parseSheet(sheetId, sheetName = null) {
      return this.$gsparser.parse(sheetId, sheetName);
    },
  },
  async mounted() {
    if (this.theUnit) {
      const res = await this.parseSheet(this.theUnit.sheetId);

      let index = 0;
      this.theUnit.data = res.map((obj) => {
        var rObj = {};
        rObj.index = index;
        rObj.key = obj["edificio "];
        rObj.value = obj["%"];
        index = index + 1;
        return rObj;
      });
    }
  },
};
</script>