<template>
  <div class="container my-4">

    <p style="font-size:larger">
      <nuxt-img id="da_logo" class="img-fluid p-1" style="max-width:340px;height:auto;" src="/foto/LOGO_DA_HD_640.jpg" />
      <span style="font-size: larger" v-html="$t('da1')"></span>
    </p>

    <p v-html="$t('da2')"></p>

    <p v-html="$t('da3')"></p>

    <p style="text-align:center">
      <nuxt-img class="img-fluid" src="/foto/MTSH_1_light.jpg" />
    </p>
  </div>
</template>

<style scoped>
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

export default {
};
</script>

