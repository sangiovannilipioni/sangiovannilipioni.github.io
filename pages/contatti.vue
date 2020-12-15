<template>
  <div>
    <iframe
      class="border rounded"
      width="100%"
      height="450"
      frameborder="0"
      src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDTTQxz4sXFODvSSA5ReR5O0rl5pdMVn_I&q=San Giovanni Lipioni"
      allowfullscreen
    >
    </iframe>
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
  async asyncData({ $content }) {
    const contatti = await $content("/articles/contatti").fetch();

    return {
      contatti,
    };
  },
};
</script>
