<template>
  <div>
    <nuxt-content :document="presentazione" />
    <client-only>
      <footer class="footer">
        <div class="float-right">version {{ version }}</div>
      </footer>
    </client-only>
  </div>
</template>
<style >
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #f5f5f5;

  font-family: monospace;
}
</style>
<script>
export default {
  async asyncData({ $content }) {
    const presentazione = await $content("/articles/presentazione").fetch();

    return {
      presentazione,
      version: process.env.NUXT_ENV_CURRENT_GIT_SHA,
    };
  },
};
</script>

