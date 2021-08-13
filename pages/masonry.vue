<template >
  <div id="photoGallery" class="container">
    <div
      v-masonry
    >
      <div
        v-masonry-tile
        class="Item"
        :key="index"
        v-for="(item, index) in items"
      >
        <nuxt-img class="Img Content zoom masonryImage" :src="`/masonry/${item.pathShort}`" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.Item {
  overflow: hidden;
  border-radius: 4px;
  width: 340px;
  background: #f5f5f5;
}
.Content {
  padding: 20px;
}
.Img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  line-height: 0;
  display: block;
}
</style>

<script>

export default {
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    const f = require.context("../static/masonry", true, /\.jpg$/);
    f.keys().forEach((key) => {
      this.items.push({ pathLong: f(key), pathShort: key });
    });

    // 
    if (typeof this.$redrawVueMasonry === "function") {
      this.$redrawVueMasonry();
    }
  },
};
</script>