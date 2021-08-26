<template>
  <client-only>
    <article class="container-fluid">
      <div class="container d-flex" style="margin-bottom: 0.5rem" v-if="theUnit.hasData || theUnit.video">
        <div class="flex-grow-1" style="margin: auto">
          <nuxt-link
            v-if="theUnit.hasData"
            :to="localePath(`/data/${slug}`)"
            class="btn btn-outline-secondary btn-sm"
            target="_self"
          >
            {{ $t("schede") }}
          </nuxt-link>
          <span v-else>{{ slug }}</span>
        </div>

        <!-- Button trigger modal 
        -->
        <button
          v-if="theUnit.video"
          type="button"
          class="btn float-end btn-outline-secondary btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#modalvideo"
        >
          Video
        </button>

        <!-- Modal 
        -->
        <div v-if="theUnit.video" class="modal fade" id="modalvideo" ref="modalvideo" tabindex="-1">
          <div class="modal-dialog modal-xl">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalLabel">{{ theUnit.title }}</h5>
                <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <vue-plyr
                  id="qwe"
                  ref="plyr"
                  v-if="theUnit.video"
                  :options="{
                    mute: true,
                    volume: 0,
                    captions: true,
                    autoplay: false
                  }"
                >
                  <div data-plyr-provider="youtube" :data-plyr-embed-id="theUnit.video"></div>
                </vue-plyr>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h4 style="text-align: center">
        {{ theUnit.title }}
        <span class="text-muted" style="font-size: smaller">[{{ slug }}]</span>
      </h4>

      <div class="binome reverse" v-if="theUnit">
        <div class="col" style="flex: 1">
          <img v-for="img in theUnit.imgs" v-bind:key="img" :src="`http://api.sangiosleague.it/api/v1/unit/${slug}/image/${img}`" class="img-fluid" />
        </div>
        <div class="col" style="flex: 2">
          <SlidesImages v-if="theUnit.slides.length" :slides="theUnit.slides" :imgURL="`http://api.sangiosleague.it/api/v1/unit/${slug}/blueprint`" />
        </div>
      </div>
    </article>
  </client-only>
</template>

<style lang="scss">
#modalvideo {
  .modal-header {
    padding: 0.5rem !important;
  }
  .modal-body {
    padding: 0 !important;
  }
}

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
      y: 0,
    }
  },
  mounted() {
    // https://stackoverflow.com/a/42513893/1070215
    // https://stackoverflow.com/a/64102684/1070215
    this.$nextTick(() => {
      const _this = this
      console.log(this.$refs.modalvideo)
      this.$refs.modalvideo.addEventListener("shown.bs.modal", () => {
        _this.$refs.plyr.player.play()
      })
      this.$refs.modalvideo.addEventListener("hidden.bs.modal", () => {
        _this.$refs.plyr.player.stop()
      })
    })
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
