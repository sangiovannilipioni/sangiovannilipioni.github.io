<template>
  <client-only>
    <div id="slides" class="container">
      <div>
        <swiper id="swiperThumbs" ref="swiperThumbs" class="swiper gallery-thumbs" :options="swiperOptionThumbs" @slideChange="onThumbnailChange">
          <swiper-slide
            v-for="(slide) in slides"
            :key="slide.title"
          >
            <b-button variant="outline-secondary">{{ slide.title }}</b-button>
          </swiper-slide>
        </swiper>
      </div>
      <h1 class="m-4" style="text-align:center">Associazione x San Giovanni</h1>
      <swiper id="swiperTop" ref="swiperTop" class="swiper gallery-top" :options="swiperOption" @slideChange="onTopChange">
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <Slide :src="`slide${index}`" />
        </swiper-slide>
      </swiper>
    </diV>
  </client-only>
</template>

<script>
export default {
  data () {
    return {
      swiperOption: {
        slidesPerView: 1,
        keyboard: {
          enabled: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination'
        },
        loop: false
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        slideToClickedSlide: true
      },
      swiperTop () {
        return this.$refs.swiperTop.swiper
      },
      swiperThumbs () {
        return this.$refs.swiperThumbs.swiper
      }
    }
  },
  computed: {
    slides () {
      return [
        {title: "1"},
        {title: "2"},
        {title: "3"},
        {title: "4"},
        {title: "5"},
        {title: "6"},
        {title: "7"},
        {title: "8"}
      ]
    }
  },
  mounted () {
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

<style lang="scss" scoped>
#slides {
  /* height: calc(100vh - (#{$footerHeight} + #{$headerHeight}));*/
}

.swiper {
  /* height: 100%; */

  .swiper-slide {
    /* background-color: rgba(255, 127, 127, .2) !important;*/
    color: black; 
    display: flex !important;
    align-items: center !important;
    flex-direction: column;
    flex-wrap: nowrap;
    overflow: scroll;
    max-height: calc(100vh - (#{$footerHeight} + #{$headerHeight}));

    div > .card {
      margin: 0 1rem 1rem 1rem;
    }
    div:first-child > .card {
      margin: 1rem;
    }
  }
}

.swiper#swiperThumbs {
  margin-top: .75rem;

  .swiper-slide {
    width: 16%;
    /* color: darkgray;
    background: rgba(127, 255, 127, 0.5) !important; */
  }
  .swiper-slide-active {
    /* color: white;
    background: rgba(127, 127, 127, .2) !important; */
  }
}
</style>
