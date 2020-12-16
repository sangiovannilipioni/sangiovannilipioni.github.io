<template>
  <div>
    <client-only>
      <swiper class="swiper" :options="swiperOption">
        <swiper-slide>
          Press
          <code class="code">left</code>
          or
          <code class="code">right</code>
          to control slide
        </swiper-slide>
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
        <swiper-slide>Slide 4</swiper-slide>
        <swiper-slide>Slide 5</swiper-slide>
        <swiper-slide>Slide 6</swiper-slide>
        <swiper-slide>Slide 7</swiper-slide>
        <swiper-slide>Slide 8</swiper-slide>
        <swiper-slide>Slide 9</swiper-slide>
        <swiper-slide>Slide 10</swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </client-only>
  </div>
</template>

<script>
// https://github.com/nolimits4web/swiper/issues/3768#issuecomment-680926562
import Swiper from 'swiper/swiper-bundle.esm'

export default {
  name: "swiper-example-navigation",
  ssr: false,
  title: "Navigation",
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        keyboard: {
          enabled: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          // type: "progressbar",
        },
        loop: false,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.swiper {
  height: auto;

  .swiper-slide {
    text-align: center;
    height: 520px;
    line-height: 520px;
    background: #ddd;
  }
}
</style>
