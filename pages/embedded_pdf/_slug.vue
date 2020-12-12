<!-- https://github.com/FranckFreiburger/vue-pdf/issues/148#issuecomment-619117454 -->
<template>
  <client-only>
    <div>
      <vue-pdf
        class="your-pdf-class"
        :src="pdfSrc"
        :page="1"
        @num-pages="pdfPageCount = $event"
      ></vue-pdf>
      <div v-if="pdfPageCount > 1">
        <div v-for="(pageNum, index) in pdfPageCount" :key="index">
          <vue-pdf
            class="your-pdf-class"
            :src="pdfSrc"
            :page="pageNum"
            v-if="pageNum > 1"
          ></vue-pdf>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script>
export default {
  
  async asyncData({ $content, params }) {
    return {
      pdfSrc: "/pdf/"+params.slug+".pdf",
      pdfPageCount: 0,
    };
  },
};
</script>
