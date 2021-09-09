<template>
  <client-only>
    <article class="container-lg">
      <h1 v-if="error" class="alert alert-warning">{{ error }}</h1>

      <UnitBanner :unit_key="$route.params.slug" :units="units" to="datasheets" />

      <div class="binome reverse" v-if="theUnit">
        <div class="col" style="flex: 1">
          <img
            v-for="img in theUnit.imgs"
            v-bind:key="img"
            :src="`${$axios.defaults.baseURL}/unit/${slug}/image/${img}`"
            class="img-fluid"
          />
        </div>
        <div class="col" style="flex: 2">
          <SlidesImages
            v-if="theUnit && theUnit.slides && theUnit.slides.length"
            :slides="theUnit.slides"
            :imgURL="`${$axios.defaults.baseURL}/unit/${slug}/blueprint`"
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
  async asyncData({ app, params, errorHandler }) {
    let units = {}, error
    await app.$axios.get("/units.json").then(
      (response) => {
        if (!response.data[params.slug]) errorHandler({ statusCode: 404 })
        return (units = response.data)
      },
      (err) => {
        error = `${err.address}:${err.port} ${app.i18n.t("no_longer_answer")}`
      }
    )
    return { units, error }
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
