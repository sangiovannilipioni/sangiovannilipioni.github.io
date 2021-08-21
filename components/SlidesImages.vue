<template>
  <client-only>
    <div id="slidesImages" class="mySlides">
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
          <button type="button" class="btn btn-outline-secondary">
            {{ slide.title }}
          </button>
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

<style lang="scss"></style>

<script>
export default {
  data() {
    return {
      swiperOptionTop: {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 20
      },
      swiperOptionThumbs: {
        centeredSlides: true,
        navigation: false,
        slidesPerView: 3,
        slideToClickedSlide: true,
        spaceBetween: 10
      },
      swiperTop() {
        return this.$refs.swiperTop.swiper
      },
      swiperThumbs() {
        return this.$refs.swiperThumbs.swiper
      }
    }
  },
  props: {
    slides: {
      default: () => [],
      type: Array,
      required: false
    },
    imgDir: {
      default: "/",
      type: String,
      required: false
    }
  },
  methods: {
    onThumbsChange(val) {
      this.$refs.swiperTop.$swiper.slideTo(val.activeIndex)
    },
    onTopChange(val) {
      this.$refs.swiperThumbs.$swiper.slideTo(val.activeIndex)
    }
  }
}
</script>
