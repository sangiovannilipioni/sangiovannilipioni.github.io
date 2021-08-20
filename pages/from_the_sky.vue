<template>
  <masonry-div :items="items" :imgDir="imgDir" />
</template>

<script>

export default {
  middleware: ["auth"],
  data() {
    return {
      items: [],
      imgDir: '/masonry/2'
    };
  },
  mounted() {
    const f = require.context("../static/masonry/2", true, /\.jpg$/);
    f.keys().forEach((key) => {
      this.items.push({ pathLong: f(key), pathShort: key });
    });
  },
};
</script>