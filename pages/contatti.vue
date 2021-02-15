<template>
  <div class="container">
<!-- 
    <iframe
      class="border rounded"
      width="100%"
      height="450"
      frameborder="0"
      :src="googleMapsUrl"
      allowfullscreen
    >
    </iframe>
 -->    
    <nuxt-content :document="contatti" />
  </div>
</template>

<style>
.card-body > p {
  margin-bottom: 0;
}
</style>

<script>
export default {
  data() {
    return {
      googleMapsUrl : `https://www.google.com/maps/embed/v1/place?key=${this.$config.googleMapsApiSecret}&q=San Giovanni Lipioni`
    }
  },
  async asyncData(context) {
    const { $content, params, app, route, redirect } = context;
    const contatti = await $content(`${app.i18n.locale}/articles`, "contatti").fetch();
    return {
      contatti,
    };
  },
};
</script>
