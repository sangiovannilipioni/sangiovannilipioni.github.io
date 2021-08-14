<template>
  <masonry-div :items="items" :imgDir="imgDir" />
</template>

<script>

export default {
  data() {
    return {
      items: [],
      imgDir: '/masonry'
    };
  },
  mounted() {
    const f = require.context("../static/masonry", true, /\.jpg$/);
    f.keys().forEach((key) => {
      this.items.push({ pathLong: f(key), pathShort: key });
    });
  },
};
</script>