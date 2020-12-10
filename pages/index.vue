<template>
  <div>
    <nuxt-content :document="presentazione" />
  </div>
</template>

<style >

</style>

<script>
export default {
  async asyncData({ $content }) {
    const presentazione = await $content("/articles/presentazione").fetch();

    return {
      presentazione,
    };
  },
};
</script>

