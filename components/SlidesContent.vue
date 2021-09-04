<template>
  <client-only>
    <div id="slidesContent" class="mySlides container-lg">
      <h1 class="m-4" style="text-align: center">
        <strong>Nessuno Escluso</strong>
      </h1>

      <swiper
        :navigation="true"
        id="swiperThumbs"
        ref="swiperThumbs"
        class="swiper gallery-thumbs my-4"
        :options="swiperOptionThumbs"
        @slideChange="onThumbnailChange"
      >
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <button type="button" class="btn btn-outline-secondary">
            {{ slide.title }}
          </button>
        </swiper-slide>
      </swiper>

      <swiper
        id="swiperTop"
        ref="swiperTop"
        class="swiper gallery-top"
        :options="swiperOption"
        @slideChange="onTopChange"
      >
        <swiper-slide v-for="(slide, index) in slides" :key="index">
          <SlideContent :src="`slide${index}`" />
        </swiper-slide>
      </swiper>
    </div>
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 20,
        keyboard: {
          enabled: true
        },
        pagination: {
          el: ".swiper-pagination"
        },
        navigation: {
          nextEl: "#next",
          prevEl: "#prev"
        },
        loop: false
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: "auto",
        slideToClickedSlide: true,
        navigation: false
      },
      swiperTop() {
        return this.$refs.swiperTop.swiper
      },
      swiperThumbs() {
        return this.$refs.swiperThumbs.swiper
      }
    }
  },
  computed: {
    slides() {
      return [
        { title: "1" },
        { title: "2" },
        { title: "3" },
        { title: "4" },
        { title: "5" },
        { title: "6" },
        { title: "7" },
        { title: "8" }
      ]
    }
  },
  mounted() {},
  methods: {
    onThumbnailChange(val) {
      this.$refs.swiperTop.$swiper.slideTo(val.activeIndex)
    },
    onTopChange(val) {
      this.$refs.swiperThumbs.$swiper.slideTo(val.activeIndex)
    }
  }
}
</script>
