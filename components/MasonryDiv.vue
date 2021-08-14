<template>
  <div id="photoGallery" class="container">
    <div id="VueMasonry" v-masonry fit-width="true">
      <div
        v-masonry-tile
        class="Item"
        :key="index"
        v-for="(item, index) in items"
      >
        <nuxt-link v-if="item.to" :to="localePath(item.to)">
          <nuxt-img
            class="Img Content masonryImage"
            :src="`${imgDir}/${item.pathShort}`"
            :disabled="item.disabled"
          />
        </nuxt-link>
        <nuxt-img v-else
          class="Img Content zoom masonryImage"
          :src="`${imgDir}/${item.pathShort}`"
          :disabled="item.disabled"
        />
        <div v-if="item.key" style="text-align:center">{{ item.key }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import MasonryDiv from "./MasonryDiv.vue";
export default {
  components: { MasonryDiv },
};
</script>

<style>
</style></template>

<style lang="scss" scoped>
#photoGallery {
  .Item {
    overflow: hidden;
    border-radius: 4px;
    width: 340px;
    /* background: #f5f5f5; */
  }
  .Content {
    padding: 10px 10px 0 10px;
  }
  .Img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    line-height: 0;
    display: block;
  }
  .Img[disabled="disabled"] {
    filter: grayscale(100%);
  }
}
</style>

<script>
export default {
  props: {
    items: {
      default: () => [],
      type: Array,
      required: false,
    },
    imgDir: {
      default: "/",
      type: String,
      required: false,
    },
  },
  mounted() {
    if (typeof this.$redrawVueMasonry === "function") {
      this.$redrawVueMasonry();
    }
  },
};
</script>