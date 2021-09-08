<!-- https://github.com/FranckFreiburger/vue-pdf/issues/148#issuecomment-619117454 -->
<template>
  <client-only>
    <div class="container-lg">
      <vue-pdf :src="pdfSrc" :page="1" @num-pages="pdfPageCount = $event"></vue-pdf>
      <div v-if="pdfPageCount > 1">
        <div v-for="(pageNum, index) in pdfPageCount" :key="index">
          <vue-pdf :src="pdfSrc" :page="pageNum" v-if="pageNum > 1"></vue-pdf>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      loading: "true"
    }
  },
  async asyncData({ $content, params }) {
    return {
      pdfSrc: "/pdf/" + params.slug + ".pdf",
      pdfPageCount: 0
    }
  }
}
</script>
