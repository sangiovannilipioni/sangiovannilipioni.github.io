<template>
  <client-only>
    <div id="slidesImages">
      <swiper
        :navigation="true"
        :options="swiperOptionThumbs"
        @slideChange="onThumbsChange"
        class="swiper gallery-thumbs my-3"
        id="swiperThumbs"
        ref="swiperThumbs"
        style="borde: 1px dotted gray"
      >
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <b-button variant="outline-secondary" style="font-size: smaller">{{
            slide.title
          }}</b-button>
        </swiper-slide>
      </swiper>

      <swiper
        :options="swiperOptionTop"
        @slideChange="onTopChange"
        class="swiper gallery-top"
        id="swiperTop"
        ref="swiperTop"
      >
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <nuxt-img class="img-fluid zoom" :src="imgDir + slide.img" />
        </swiper-slide>
      </swiper>
    </div>
  </client-only>
</template>

<style lang="scss">
#slidesImages {
  margin-bottom: 1rem;

  .swiper#swiperThumbs {
    background-color: #eee;
    border-radius: 0.25rem;
    border: 1px dotted rgb(191, 191, 191);
    margin: 0 0 0.5rem 0 !important;
    padding: .5rem 0;
    z-index: 0;

    .swiper-slide {
      width: 15%;
    }

    .swiper-slide-active > button {
      color: white;
      background-color: lightgray;
    }
  }
}
</style>


<script>
export default {
  data() {
    return {
      swiperOptionTop: {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 20,
      },
      swiperOptionThumbs: {
        centeredSlides: true,
        navigation: false,
        slidesPerView: 3,
        slideToClickedSlide: true,
        spaceBetween: 10,
      },
      swiperTop() {
        return this.$refs.swiperTop.swiper;
      },
      swiperThumbs() {
        return this.$refs.swiperThumbs.swiper;
      },
    };
  },
  props: {
    slides: {
      default: () => [],
      type: Array,
      required: false,
    },
    imgDir: {
      default: '/',
      type: String,
      required: false,
    },
  },
  methods: {
    onThumbsChange(val) {
      this.$refs.swiperTop.$swiper.slideTo(val.activeIndex);
    },
    onTopChange(val) {
      this.$refs.swiperThumbs.$swiper.slideTo(val.activeIndex);
    },
  },
};
</script>

