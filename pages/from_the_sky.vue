<template>
  <masonry-div :items="items" :imgDir="imgDir" />
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      items: [],
      imgDir: "/masonry/2/"
    }
  },
  mounted() {
    const f = require.context("~/static/masonry/2/", true, /\.jpg$/)
    let count = 0;
    f.keys().forEach((key) => {
      this.items.push({ title: f(key), src: this.imgDir+key, didascalia : { text: count++}})
    })
  }
}
</script>
