<template>
  <div class="logo" v-html="src"></div>
</template>

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
