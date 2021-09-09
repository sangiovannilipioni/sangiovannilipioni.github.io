<template>
  <div id="photoGallery" class="container-lg d-flex justify-content-center">
    <div id="VueMasonry" v-masonry fit-width="true">
      <div v-masonry-tile class="Item" :key="index" v-for="(item, index) in shuffled">
        <nuxt-link v-if="item.to" :to="localePath(item.to)">
          <img class="Img Content masonryImage" :src="item.src" :title="item.title" />
        </nuxt-link>
        <img v-else class="Img Content zoom masonryImage" :src="item.src" :title="item.title" data-color="gray" />
        <div v-if="item.didascalia" class="Didascalie">
          {{ item.didascalia.text }}
          <span v-if="item.didascalia.link">
            <nuxt-link v-if="item.didascalia.link.to" :to="localePath(item.didascalia.link.to)">
              {{ item.didascalia.link.text }}
            </nuxt-link>
            <span v-else class="text-muted">
              {{ item.didascalia.link.text }}
            </span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#photoGallery {
  .Item {
    overflow: hidden;
    border-radius: 4px;
    width: 334px;
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
  .Img[data-color="gray"] {
    filter: grayscale(100%);
  }
  .Didascalie {
    text-align: center;
  }
}
</style>

<script>
export default {
  props: {
    items: {
      default: () => [],
      type: Array,
      required: false
    },
    shuffle: {
      default: true,
      type: Boolean,
      required: false
    }
  },
  computed: {
    shuffled() {
      return this.shuffle ? this.$store.$shuffleArray(this.items) : this.items
    }
  },
  mounted() {
    if (typeof this.$redrawVueMasonry === "function") {
      this.$redrawVueMasonry()
    }
  }
}
</script>
