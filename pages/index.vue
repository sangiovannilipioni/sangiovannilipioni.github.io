<template>
  <div>
    <nuxt-content :document="presentazione" />
  </div>
</template>
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

