<template>
  <div class="p-2">
    <div
      v-html="src"
      class="logo blurp d-flex justify-content-center align-items-center"
    ></div>
    <Nuxt style="z-index: 12345" />
    <footer class="fixed-bottom">
      <div class="text-muted px-2">
        <div style="whitespace: nowrap">
          Associazione <b>Nessuno Escluso</b> APS
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
.blurp {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: auto;
  filter: opacity(10%) blur(3px);
}
.blurp svg {
  width: 100%;
}
</style>


<script>
export default {
  computed: {
    src() {
      const src = require(`assets/svg/Logo_qr_code.svg?raw`);
      return src;
    },
  },
};
</script>