<template>
  <div class="container">
    <nuxt-content :document="internet" />
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
    const internet = await $content(`${app.i18n.locale}/articles`, "internet").fetch();
    return {
      internet,
    };
  },
};
</script>
