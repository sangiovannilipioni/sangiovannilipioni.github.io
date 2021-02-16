<template>
  <div class="container">
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
      googleMapsUrl : ``
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
