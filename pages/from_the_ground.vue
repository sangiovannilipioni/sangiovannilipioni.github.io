<template>
  <masonry-div :items="items" :imgDir="imgDir" />
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      items: [],
      imgDir: "/masonry/1/"
    }
  },
  mounted() {
    const f = require.context("~/static/masonry/1/", true, /\.jpg$/) // The relative path of the static folder
    let count = 0;
    f.keys().forEach((key) => {
      this.items.push({ title: f(key), src: this.imgDir+key, didascalia : { text: count++}})
    })
  }
}
</script>
