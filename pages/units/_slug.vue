<template>
  <article class="container-fluid">
    <b-button variant="light" to="/patrimonio">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </b-button>
    
    {{ slug }}
    <div class="d-flex bd-highlight" v-if="theUnit">
      <div class="p-2 flex-fill bd-highlight" style="min-width: 30%">
        <div v-for="text in theUnit.texts" v-bind:key="text">
          <nuxt-content :document="unit" />
        </div>
        <b-img v-for="img in theUnit.imgs" v-bind:key="img" :src="`/foto/${img}`" fluid>
        </b-img>
      </div>
      <div class="p-2 flex-fill bd-highlight" style="max-width: 70%">
        <AnySlides v-if="theUnit.slides.length" :slides="theUnit.slides" imgDir="/foto/cropped-images/"></AnySlides>
      </div>
    </div>
  </article>
</template>

<style>
.card-body > p {
  margin-bottom: 0;
}
.carousel-control-prev-icon,
.carousel-control-next-icon {
  background-image: none;
}

.carousel-control-next-icon:after {
  content: ">";
  font-size: 55px;
  color: navy;
}

.carousel-control-prev-icon:after {
  content: "<";
  font-size: 55px;
  color: navy;
}
</style>

<script>
export default {
  data() {
    return {
      units: {
        O02: {
          slides: [
              {jpeg: "O1__O2-PianoPrimo.jpg", title: "Piano Primo"},
              {jpeg: "O1__O2-PianoSeminterrato.jpg", title: "Piano Seminterrato"},
              {jpeg: "O1__O2-PianoTerra.jpg", title: "Piano Terra"},
              {jpeg: "O1__O2-ProspettoNord.jpg", title: "Prospetto Nord"},
              {jpeg: "O1__O2-ProspettoOvestEst.jpg", title: "Prospetto Ovest Est"},
              {jpeg: "O1__O2-ProspettoSud.jpg", title: "Prospetto Sud"},
              {jpeg: "O1__O2-SezioneA.jpg", title: "Sezione A"},
              {jpeg: "O1__O2-SezioneBCD.jpg", title: "Sezione B C D"},
          ],
          texts: ["Via Roma, 37"],
          imgs: ["GOPR1232_light_2.jpg"],
        },
        G01: {
          slides: [],
          texts: ["Via Vicenne. 4"],
          imgs: ["X2.jpg"],
        },
      },
    };
  },
  computed: {
    slug() {
      return this.$route.params.slug
    },
    theUnit() {
      return this.units[this.$route.params.slug]
    }
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
