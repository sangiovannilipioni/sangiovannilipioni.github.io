<template>
  <client-only>
    <div id="slides" class="container">

      <h1 class="m-4" style="text-align:center">
        <strong>Nessuno Escluso</strong>
      </h1>

      <swiper :navigation="true" id="swiperThumbs" ref="swiperThumbs" class="swiper gallery-thumbs my-4" style="borde: 1px dotted gray;" :options="swiperOptionThumbs" @slideChange="onThumbnailChange">
        <swiper-slide
          v-for="(slide, index) in slides"
          :key="index">
          <b-button variant="outline-secondary">{{ slide.title }}</b-button>
        </swiper-slide>
      </swiper>

      <swiper id="swiperTop" ref="swiperTop" class="swiper gallery-top" :options="swiperOption" @slideChange="onTopChange">
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <SlideContent :src="`slide${index}`" />
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
        loop: false
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
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

<style lang="scss">

#slides {

  margin-bottom: 1rem;

  img {
    margin-left: 1rem;
    max-width: 30%;
    float: right;
  }
}

.swiper-button-prev, .swiper-button-next {
  top: 5% !important;
}

.swiper {
  border-radius: 0.25rem;

  .swiper-slide {
    display: flex !important;
    /* align-items: center !important; */
    color: black; 
    display: flex !important;
    align-items: center !important;
    flex-direction: column;
    flex-wrap: nowrap;
    overflow: scroll;
    max-height: calc(100vh - (#{$footerHeight} + #{$headerHeight}));

    > div {
      width: 100%;
    }
  }
}

.swiper#swiperTop {

  border: 1px dotted gray;

  .swiper-slide {
    background-color: white;
    padding: 0.75rem;
  }
}

.swiper#swiperThumbs {
  margin: .75rem 0 !important;
  padding: .5rem 0;
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
</style>
