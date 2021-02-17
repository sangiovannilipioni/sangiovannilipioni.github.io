<template>
  <article class="container">
    <nuxt-content :document="article" />
  </article>
</template>

<script>
export default {
  async asyncData(context) {
    const { $content, params, app, route, redirect } = context;
    const article = await $content(`${app.i18n.locale}/articles`, params.slug).fetch();
    return { article };
  },
};
</script>
