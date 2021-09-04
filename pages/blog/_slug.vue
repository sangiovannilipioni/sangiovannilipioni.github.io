<template>
  <article class="-lg">
    <nuxt-content :document="article" />
  </article>
</template>

<style>
.card-body > p {
  margin-bottom: 0;
}
</style>

<script>
export default {
  async asyncData({ $content, params, app, route, redirect }) {
    const article = await $content(`${app.i18n.locale}/articles`, params.slug).fetch()
    return { article }
  }
}
</script>
