<template>
  <client-only>
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide
        ><div>
          Press
          <code class="code">left</code>
          or
          <code class="code">right</code>
          to control slide
        </div>
      </swiper-slide>
      <swiper-slide class="d-flex align-items-left">
        <div>1</div>
      </swiper-slide>
      <swiper-slide class="d-flex align-items-left">
        <div>2</div>
      </swiper-slide>
      <swiper-slide class="d-flex__align-items-center">
        <div>3</div>
      </swiper-slide>
      <swiper-slide class="d-flex__align-items-center">
        <div>4</div>
      </swiper-slide>
      <swiper-slide class="d-flex__align-items-center">
        <div>5</div>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </client-only>
</template>

<style lang="scss" scoped>
.swiper {
  height: 100%;

  .swiper-slide {
    background: #eee;
    display: flex !important;
    align-items: center !important;

    > div {
      width: 100%;
      text-align: center;
    }
  }
}
</style>

<script>
// https://github.com/nolimits4web/swiper/issues/3768#issuecomment-680926562
import Swiper from "swiper/swiper-bundle.esm";

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


