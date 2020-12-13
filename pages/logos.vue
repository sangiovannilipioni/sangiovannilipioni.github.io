<template>
  <div class="logos mx-auto">
    <style>
      .logos svg path {
        stroke-width: {{strokeWidth}};
      }
    </style>
    <div id="blah" class="d-flex">
      <label class="d-inline-block flex-shrink-1" for="customRange1"
        >Stroke Width: <span>{{ strokeWidth }}</span></label
      >
      &nbsp;
      <input
        class="custom-range w-100 d-inline-block"
        type="range"
        id="customRange1"
        min="1"
        max="160"
        step="1"
        v-model="strokeWidth"
      />
    </div>
    <div v-html="src" class="d-flex justify-content-center"></div>
  </div>
</template>

<style>
#blah {
  white-space: nowrap;
}
label[for="customRange1"] span {
  font-family: monospace;
  font-size: larger;
}
</style>
<script>
export default {
  name: "Icon",
  data() {
    return {
      strokeWidth: 20,
    };
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    src() {
      const src = require(`assets/svg/Logo_qr_code_2.svg?raw`);
      return src;
    },
  },
};
</script>