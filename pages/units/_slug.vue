<template>
  <article class="container">
    <b-button variant="light" to="/patrimonio">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </b-button>
    <!-- nuxt-content :document="unit" /-->
    <div class="d-flex bd-highlight">
      <div class="p-2 flex-fill bd-highlight" style="min-width: 30%;">
        <div
            v-for="text in texts"
            v-bind:key="text"
        >
        <h4>{{ text }}</h4>
        </div>
      </div>
      <div class="p-2 flex-fill bd-highlight">
        <b-carousel
          id="carousel-1"
          controls
          indicators
          style="color:red;"
          no-animation
        >
          <b-carousel-slide
            :img-src="jpeg"
            v-for="jpeg in jpegs"
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

.carousel-control-next-icon:after
{
  content: '>';
  font-size: 55px;
  color: navy;
}

.carousel-control-prev-icon:after {
  content: '<';
  font-size: 55px;
  color: navy;
}
</style>

<script>
export default {
  data() {
    return {
      jpegs: [
        "/foto/O1__O2-PianoSeminterrato.jpg",
        "/foto/O1__O2-PianoTerra.jpg",
        "/foto/O1__O2-ProspettoNord.jpg",
        "/foto/O1__O2-ProspettoOvestEst.jpg",
        "/foto/O1__O2-ProspettoSud.jpg",
        "/foto/O1__O2-SezioneA.jpg",
        "/foto/O1__O2-SezioneBCD.jpg",
      ],
      texts: [
        "Via Roma, 37"
      ]
    };
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
