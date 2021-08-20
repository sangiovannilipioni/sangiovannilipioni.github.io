<template>
  <article class="container-fluid">
    <div class="container d-flex" style="margin-bottom: .5rem;">
      <b-button variant="outline-secondary" size="sm"  to="/patrimonio">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </b-button>

      <div class="flex-grow-1 text-center text-muted" style="margin: auto;">
        <b-button v-if="theUnit.hasData" variant="outline-secondary" size="sm"  :to="`/data/${slug}`">
          {{ $t("schede") }}
        </b-button>
        <span v-if="!theUnit.hasData" >{{ slug }}</span>
      </div>

      <b-button v-b-modal.modalvideo v-if="theUnit.video" variant="outline-secondary" size="sm" class="float-right">Video ...</b-button>

      <b-modal id="modalvideo" :title="theUnit.title" size="xl" :hide-footer="true">
        <vue-plyr
          v-if="theUnit.video"
          :options="{ mute: true, volume: 0, captions: true, autoplay: true}"
        >
          <div
            data-plyr-provider="youtube"
            :data-plyr-embed-id="theUnit.video"
          ></div>
        </vue-plyr>
      </b-modal>
    </div>

    <h4 style="text-align:center;">{{ theUnit.title }} <span class="text-muted" style="font-size: smaller;">[{{ slug }}]</span></h4>

    <div class="binome reverse" v-if="theUnit">
      <div class="col" style="flex: 1;">
        <nuxt-img
          v-for="img in theUnit.imgs"
          v-bind:key="img"
          :src="`/foto/${img}`"
          class="img-fluid"
        />
      </div>
      <div class="col" style="flex: 2;">
        <SlidesImages
          v-if="theUnit.slides.length"
          :slides="theUnit.slides"
          :imgDir="imgDir" />
      </div>
    </div>
  </article>
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
  display:none !important;
}

.medium-zoom-image {
  z-index: 12;
  width:100vh;
  height:auto;
}

</style>

<script>
import SlidesImages from '../../components/SlidesImages.vue';
import VueDraggableResizable from 'vue-draggable-resizable'

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
      imgDir: "/foto/cropped-images/",
      units: {
        O02: {
          hasData: true,
          slides: [
            { img: "O1__O2-PianoTerra.jpg",        title: "Piano Terra" },
            { img: "O1__O2-PianoPrimo.jpg",        title: "Piano Primo" },
            { img: "O1__O2-PianoSeminterrato.jpg", title: "Piano Seminterrato" },
            { img: "O1__O2-ProspettoNord.jpg",     title: "Prospetto Nord" },
            { img: "O1__O2-ProspettoOvestEst.jpg", title: "Prospetto Ovest Est" },
            { img: "O1__O2-ProspettoSud.jpg",      title: "Prospetto Sud" },
            { img: "O1__O2-SezioneA.jpg",          title: "Sezione A" },
            { img: "O1__O2-SezioneB.jpg",          title: "Sezione B" },
          ],
          title: "Via Roma, 37",
          imgs: ["GOPR1232_light_2.jpg"],
          video: "https://youtu.be/pmgZcSv4Huk",
        },
        G01: {
          hasData: false,
          slides: [],
          title: "Via Vicenne. 4",
          imgs: ["X2.jpg"],
        },
      },
    };
  },
  computed: {
    slug() {
      return this.$route.params.slug;
    },
    theUnit() {
      return this.units[this.$route.params.slug];
    },
  },
  /*
  async asyncData({ $content, params, app, route, redirect }) {
    const unit = await $content(
      `${app.i18n.locale}/units`,
      params.slug
    ).fetch();
    return { unit };
  },
  */
  methods: {
    onResize: function (x, y, width, height) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
    },
    onDrag: function (x, y) {
      this.x = x
      this.y = y
    }
  }
};
</script>
