<template>
  <client-only>
    <Slides />
    <!-- swiper class="swiper" :options="swiperOption">
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
    </!-->
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
export default {
};
</script>


