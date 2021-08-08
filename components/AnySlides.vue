<template>
  <client-only>
    <div id="anySlides">

      <swiper :navigation="true" id="swiperThumbs" ref="swiperThumbs" class="swiper gallery-thumbs my-4" style="borde: 1px dotted gray;" :options="swiperOptionThumbs" @slideChange="onThumbnailChange">
        <swiper-slide
          v-for="(slide, index) in slides"
          :key="index">
          <b-button variant="outline-secondary" style="font-size:smaller;">{{ slide.title }}</b-button>
        </swiper-slide>
      </swiper>

      <swiper id="swiperTop" ref="swiperTop" class="swiper gallery-top" :options="swiperOption" @slideChange="onTopChange">
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <nuxt-img class="img-fluid" :src="imgDir+slide.jpeg" />
          <!-- Slide :src="`slide${index}`" /-->
        </swiper-slide>
      </swiper>
    </diV>
  </client-only>
</template>

<style lang="scss">

#anySlides {

  margin-bottom: 1rem;

  .swiper#swiperThumbs {
    margin: .75rem 0 !important;
    /* padding: .5rem 0; */
    background-color: #eee;
    border: 1px dotted rgb(191, 191, 191);

    .swiper-slide {
      width: 16%;
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
  data () {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 20,
        keyboard: {
          enabled: true
        },
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: "#next",
          prevEl: "#prev",
        },
        loop: false,
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 3,
        slideToClickedSlide: true,
        navigation: false,
      },
      swiperTop () {
        return this.$refs.swiperTop.swiper
      },
      swiperThumbs () {
        return this.$refs.swiperThumbs.swiper
      }
    }
  },
  props: {
    slides: {
      default: () => [],
      type: Array,
      required: false,
    },
    imgDir: {
      default: "/",
      type: String,
      required: false,
    },
  },
  methods: {
    onThumbnailChange (val) {
      this.$refs.swiperTop.$swiper.slideTo(val.activeIndex)
    },
    onTopChange (val) {
      this.$refs.swiperThumbs.$swiper.slideTo(val.activeIndex)
    },
  }
}
</script>

