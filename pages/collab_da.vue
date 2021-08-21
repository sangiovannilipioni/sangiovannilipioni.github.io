<template>
  <div class="container">
    <p style="font-size: larger">
      <a href="https://da.unibo.it/it" target="_blank">
        <nuxt-img
          id="da_logo"
          class="img-fluid img-thumbnail"
          style="max-width: 320px"
          src="/foto/LOGO_DA_HD_320.jpeg"
        />
      </a>
      <span style="font-size: larger" v-html="$t('da1')"></span>
    </p>

    <p v-html="$t('da2')"></p>

    <p v-html="$t('da3')"></p>

    <p style="text-align: center">
      <a href="https://amslaurea.unibo.it/22533/" target="_blank">
        <nuxt-img class="img-fluid" src="/foto/MTSH_1_light.jpg" />
      </a>
    </p>
  </div>
</template>

<style scoped>
.container :last-child {
  margin-bottom: 0;
}
@media (min-width: 540px) {
  #da_logo {
    float: right !important;
  }
}
@media (max-width: 540px) {
  #da_logo {
    float: none;
  }
}
</style>

<script>
export default {}
</script>
