<template>
  <div class="logos mx-auto">
    <div v-html="src"></div>
  </div>
</template>
<style>
.logos svg path {
  stroke-width: 24;
}
</style>
<script>
export default {
  name: "Icon",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    src() {
      const src = require(`assets/svg/Logo_qr_code.svg?raw`);
      return src;
    },
  },
};
</script>