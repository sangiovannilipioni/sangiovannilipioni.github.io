<template>
  <client-only>
    <article class="container-lg">
      <UnitBanner :unit_key="$route.params.slug" :units="units" to="data"/>

      <div class="binome reverse" v-if="theUnit">
        <div class="col" style="flex: 1">
          <img
            v-for="img in theUnit.imgs"
            v-bind:key="img"
            :src="`https://api.sangiovannilipioni.net/api/v1/unit/${slug}/image/${img}`"
            class="img-fluid"
          />
        </div>
        <div class="col" style="flex: 2">
          <SlidesImages
            v-if="theUnit && theUnit.slides && theUnit.slides.length"
            :slides="theUnit.slides"
            :imgURL="`https://api.sangiovannilipioni.net/api/v1/unit/${slug}/blueprint`"
          />
        </div>
      </div>
    </article>
  </client-only>
</template>

<style lang="scss">
.handle:not(.handle-mr) {
  display: none !important;
}

.medium-zoom-image {
  z-index: 12;
  width: 100vh;
  height: auto;
}
</style>

<script>
import SlidesImages from "../../components/SlidesImages.vue"

export default {
  components: {
    SlidesImages
  },
  data() {
    return {
      width: 0,
      height: 0,
      x: 0,
      y: 0
    }
  },
  async asyncData({ app, params, error }) {
    let units
    await app.$axios.get("/units.json").then((response) => {
      if (!response.data[params.slug]) error({ statusCode: 404 })
      return (units = response.data)
    })
    return { units }
  },
  computed: {
    slug() {
      return this.$route.params.slug
    },
    theUnit() {
      return this.units[this.$route.params.slug]
    }
  }
}
</script>
