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
      <swiper-slide class="d-flex align-items-start"
        ><div>
          <div>
            <h1>Presentazione</h1>
            <img src="/pres/CT_5.jpg" style="max-width: 33%; width: 300px" />
          </div></div
      ></swiper-slide>
      <swiper-slide class="d-flex__align-items-center"
        ><div>
          <h3>Cittadinanza San Giovanni Lipionese per Adozione dal 1982</h3>
          <img src="/pres/world_cup.jpg" style="max-width: 33%; width: 200px" />
        </div>
      </swiper-slide>
      <swiper-slide class="d-flex__align-items-center"
        ><div>
          <h2>Son bravo in :</h2>
          <ol>
            <li><h3>1. Musica</h3> &amp;</li>
            <li><h3>2. Informatica</h3></li>
          </ol>
          <h4>ultimi 15 anni con</h4>
          <img src="/pres/SAP.png" style="max-width: 33%; width: 200px" />
          <h4>
          <a
              href="https://www.google.com/search?q=top+ten+european+software+company"
              ><code>"first european software company"</code></a
            >
          </h4>
          <h3>Da Gennaio 2020 in pre-penzione.</h3>
        </div></swiper-slide
      >
      <swiper-slide class="d-flex__align-items-center"
        ><div>
          </div></swiper-slide
      >
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


