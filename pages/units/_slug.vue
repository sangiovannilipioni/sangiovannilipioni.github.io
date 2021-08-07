<template>
  <article class="container">
    <b-button variant="light" to="/patrimonio">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </b-button>
    <!-- nuxt-content :document="unit" /-->
    {{ slug }}
    <div class="d-flex bd-highlight" v-if="theUnit">
      <div class="p-2 flex-fill bd-highlight" style="min-width: 30%">
        <div v-for="text in theUnit.texts" v-bind:key="text">
          <h4>{{ text }}</h4>
        </div>
        <b-img v-for="img in theUnit.imgs" v-bind:key="img" :src="`/foto/${img}`" fluid>
        </b-img>
      </div>
      <div class="p-2 flex-fill bd-highlight">
        <b-carousel
          v-if="theUnit.jpegs.length"
          id="carousel-1"
          controls
          indicators
          style="color: red"
          no-animation
          :interval="0"
        >
          <b-carousel-slide
            :img-src="`/foto/${jpeg}`"
            v-for="jpeg in theUnit.jpegs"
            v-bind:key="jpeg"
          >
          </b-carousel-slide>
        </b-carousel>
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
        A02: {
          jpegs: [
            "O1__O2-PianoPrimo.jpg",
            "O1__O2-PianoSeminterrato.jpg",
            "O1__O2-PianoTerra.jpg",
            "O1__O2-ProspettoNord.jpg",
            "O1__O2-ProspettoOvestEst.jpg",
            "O1__O2-ProspettoSud.jpg",
            "O1__O2-SezioneA.jpg",
            "O1__O2-SezioneBCD.jpg",
          ],
          texts: ["Via Roma, 37"],
          imgs: ["GOPR1232_light_2.jpg"],
        },
        G01: {
          jpegs: [],
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
