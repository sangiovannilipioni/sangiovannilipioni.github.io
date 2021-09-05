<template>
  <div>
    <div class="d-flex" style="margin-bottom: 0.5rem">
      <div class="flex-grow-1" style="margin: auto">
        <nuxt-link v-if="to && unit_key" :to="localePath(`/${to}/${unit_key}`)" class="btn btn-outline-secondary btn-sm" target="_self">
          {{ $t(to) }}
        </nuxt-link>
      </div>
      <div v-if="unit && unit.video">
        <button
          type="button"
          class="btn float-end btn-outline-secondary btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#modalvideo"
        >
          Video
        </button>
      </div>
    </div>
    
    <div class="d-flex justify-content-center" style="margin-bottom: 0.5rem">
      <nuxt-link
        v-if="here && prev"
        :to="localePath(`/${here}/${prev}`)"
        class="btn btn-outline-secondary btn-sm"
        target="_self"
      >
        <font-awesome-icon :icon="['fas', 'arrow-left']" />&nbsp;<span class="text-muted" style="font-size: smaller"
          >[{{ prev }}]</span
        >
      </nuxt-link>
      <button v-else class="btn btn-outline-secondary btn-sm" disabled>
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </button>

      <div id="title" class="mx-4">
        <b v-if="unit && unit.title" style="font-size: larger">{{ unit.title }}</b>
        <span v-if="unit_key" class="text-muted" style="font-size: smaller">[{{ unit_key }}]</span>
      </div>

      <nuxt-link
        v-if="here && next"
        :to="localePath(`/${here}/${next}`)"
        class="btn btn-outline-secondary btn-sm"
        target="_self"
      >
        <span class="text-muted" style="font-size: smaller">[{{ next }}]</span>&nbsp;<font-awesome-icon
          :icon="['fas', 'arrow-right']"
        />
      </nuxt-link>
      <button v-else  class="btn btn-outline-secondary btn-sm" disabled>
        <font-awesome-icon :icon="['fas', 'arrow-right']" />
      </button>
    </div>

    <div v-if="unit && unit.video" class="modal fade" id="modalvideo" ref="modalvideo" tabindex="-1">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h5 v-if="unit && unit.title" class="modal-title" id="modalLabel">{{ unit.title }}</h5>
            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <client-only>
              <!-- need client-only; otherwise, we get "Vuejs Error: The client-side rendered virtual DOM tree is not matching server-rendered" -->
              <vue-plyr
                id="qwe"
                ref="plyr"
                v-if="unit.video"
                :options="{
                  mute: true,
                  volume: 0,
                  captions: true,
                  autoplay: false
                }"
              >
                <div data-plyr-provider="youtube" :data-plyr-embed-id="unit.video"></div>
              </vue-plyr>
            </client-only>
          </div>
        </div>
      </div>
    </div>
  </div>
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
</style>

<script>
export default {
  data() {
    return {
      unitArray: [],
      unitIndex: 0,
      next: undefined,
      prev: undefined
    }
  },
  computed: {
    here() {
      return this.to === "datasheets" ? "blueprints" : "datasheets"
    },
    unit() {
      return this.units[this.unit_key]
    }
  },
  methods: {
    thisUnitIndex() {
      let i = 0
      for (; i < this.unitArray.length; i++) {
        if (this.unitArray[i].key === this.$route.params.slug) {
          break
        }
      }
      return i
    },
    nextUnit() {
      let i = this.unitIndex
      if (i + 1 < this.unitArray.length) {
        return this.unitArray[(i + 1) % this.unitArray.length].key
      }
      return undefined
    },
    previousUnit() {
      let i = this.unitIndex
      if (0 < i) {
        return this.unitArray[(i + this.unitArray.length - 1) % this.unitArray.length].key
      }
      return undefined
    }
  },
  props: {
    to: {
      default: undefined,
      type: String,
      required: false
    },
    unit_key: {
      default: undefined,
      type: String,
      required: true
    },
    units: {
      default: [],
      type: Object,
      required: true
    }
  },
  mounted() {
    this.unitArray = Object.entries(this.units).map(([key, val]) => ({ key, ...val }))
    this.unitIndex = this.thisUnitIndex()
    this.prev = this.previousUnit()
    this.next = this.nextUnit()
    // https://stackoverflow.com/a/42513893/1070215
    // https://stackoverflow.com/a/64102684/1070215
    this.$nextTick(() => {
      const _this = this
      if (this.$refs.modalvideo) {
        this.$refs.modalvideo.addEventListener("shown.bs.modal", () => {
          _this.$refs.plyr.player.play()
        })
        this.$refs.modalvideo.addEventListener("hidden.bs.modal", () => {
          _this.$refs.plyr.player.stop()
        })
      }
    })
  }
}
</script>
