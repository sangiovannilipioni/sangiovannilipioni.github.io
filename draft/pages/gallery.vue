<template >
  <!--div id="example-1">
    <span v-for="image in images" :key="1">
      <img :src="image.pathLong">
    </span>
  </div-->
  <div id="app">
    <vue-masonry-wall :items="items" :options="options" @append="append">
      <template v-slot:default="{ item }">
        <div class="Item">
          <img :src="item.pathLong" />
        </div>
      </template>
    </vue-masonry-wall>
  </div>
</template>

<style scoped>
.Item {
  overflow: hidden;
  border-radius: 4px;
  width: 100%;
  background: #f5f5f5;
}
.Content {
  padding: 20px;
}
img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  line-height: 0;
  display: block;
}
</style>

<script>
import VueMasonryWall from "vue-masonry-wall";
export default {
  name: "app",
  components: { VueMasonryWall },
  data() {
    return {
      options: {
        width: 360,
        padding: {
          2: 8,
          default: 12,
        },
      },
      items: [],
    };
  },

  mounted() {
    const f = require.context("../static/img", true, /\.jpg$/);
    f.keys().forEach((key) => {
      this.items.push({ pathLong: f(key), pathShort: key });
    });
  },

  methods: {
    append() {},
  },
};
</script>