<template>
  <article class="container-fluid">
    <div class="container d-flex">
      <b-button variant="outline-secondary" size="sm"  to="/patrimonio">
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </b-button>

      <div class="flex-grow-1 text-center text-muted" style="margin: auto;">
        <b-button variant="outline-secondary" size="sm"  :to="`/data/${slug}`">
          {{ slug }}
        </b-button>
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

    <div class="d-flex bd-highlight" v-if="theUnit">
      <div class="p-2 flex-fill bd-highlight" style="min-width: 30%">
        <nuxt-content :document="unit" />
        <b-img
          v-for="img in theUnit.imgs"
          v-bind:key="img"
          :src="`/foto/${img}`"
          fluid
        >
        </b-img>
      </div>
      <div class="p-2 flex-fill bd-highlight" style="max-width: 70%">
        <jpeg-slides
          v-if="theUnit.slides.length"
          :slides="theUnit.slides"
          :imgDir="imgDir"
        ></jpeg-slides>
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
</style>

<script>
import JpegSlides from '../../components/JpegSlides.vue';
export default {
  components: { JpegSlides },
  data() {
    return {
      imgDir: "/foto/cropped-images/",
      units: {
        O02: {
          slides: [
            { jpeg: "O1__O2-PianoPrimo.jpg",        title: "Piano Primo" },
            { jpeg: "O1__O2-PianoSeminterrato.jpg", title: "Piano Seminterrato" },
            { jpeg: "O1__O2-PianoTerra.jpg",        title: "Piano Terra" },
            { jpeg: "O1__O2-ProspettoNord.jpg",     title: "Prospetto Nord" },
            { jpeg: "O1__O2-ProspettoOvestEst.jpg", title: "Prospetto Ovest Est" },
            { jpeg: "O1__O2-ProspettoSud.jpg",      title: "Prospetto Sud" },
            { jpeg: "O1__O2-SezioneA.jpg",          title: "Sezione A" },
            { jpeg: "O1__O2-SezioneBCD.jpg",        title: "Sezione B C D" },
          ],
          title: "Via Roma, 37",
          imgs: ["GOPR1232_light_2.jpg"],
          video: "https://youtu.be/pmgZcSv4Huk",
        },
        G01: {
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
  async asyncData({ $content, params, app, route, redirect }) {
    const unit = await $content(
      `${app.i18n.locale}/units`,
      params.slug
    ).fetch();
    return { unit };
  },
};
</script>
