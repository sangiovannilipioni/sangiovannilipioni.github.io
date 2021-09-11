<template>
  <div id="collab_da">
    <div id="logo_da">
      <a href="https://da.unibo.it/it" target="_blank">
        <nuxt-img class="img-fluid img-thumbnail" src="/foto/LOGO_DA_HD_320.jpeg" />
      </a>
    </div>

    <p>
      <span class="fs-5" v-html="$t('da1')"></span>
    </p>

    <p style="clear: both" v-html="$t('da2')"></p>

    <p v-html="$t('da3')"></p>

    <div id="foto_da">
      <a href="https://amslaurea.unibo.it/22533/" target="_blank">
        <nuxt-img class="img-fluid" src="/foto/MTSH_1_light.jpg" />
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#collab_da {
  #logo_da {
    text-align: center;
    a {
      img {
        margin-bottom: 1rem;
      }
      @media (min-width: 540px) {
        img {
          float: right !important;
          margin-left: 1rem;
        }
      }
      @media (max-width: 540px) {
        img {
          float: none;
        }
      }
    }
  }
  #foto_da {
    text-align: center;
  }
  > :last-child {
    margin-bottom: 0;
  }
}
</style>
