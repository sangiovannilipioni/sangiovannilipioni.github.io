<template>
  <article class="container">
    <b-button variant="light" to="/patrimonio">
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </b-button>
    <nuxt-content :document="unit" />
  </article>
</template>

<style>
.card-body > p {
  margin-bottom: 0;
}
</style>

<script>
export default {
  async asyncData({ $content, params, app, route, redirect } ) {
    const unit = await $content(
      `${app.i18n.locale}/units`,
      params.slug
    ).fetch();
    return { unit };
  },
};
</script>
