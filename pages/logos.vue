<template>
  <div class="logos mx-auto">
    <!-- https://github.com/nuxt/nuxt.js/issues/6645#issuecomment-550111141 -->
    <component :is="'style'">
      .logos svg path { stroke-width: {{ strokeWidth }}; } 
      .logos svg > g {
      transform: translate(-20px,-250px) {{ getMatrixForRotation(310, 535) }}; }
    </component>
    <b-form id="strokeWidthForm" class="form-inline">
      <div class="blah d-flex w-100">
        <label class="" for="strokeWidth">Stroke Width</label>
        <b-form-input
          class="d-inline-flex px-2"
          type="range"
          id="strokeWidth"
          min="0"
          max="128"
          step="1"
          v-model="strokeWidth"
        />
        <div class="feedback">{{ strokeWidth }}</div>
      </div>
      <div class="d-flex w-100">
        <label class="" for="angle">Angle</label>
        <b-form-input
          class="px-2"
          type="range"
          id="angle"
          min="0"
          max="360"
          step="1"
          v-model="angle"
        />
        <div class="feedback">{{ angle }}</div>
      </div>
    </b-form>
    <div v-html="src" class="d-flex justify-content-center"></div>
  </div>
</template>

<style>
.blah {
  white-space: nowrap;
}
.feedback {
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
      angle: 180,
    };
  },
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  methods: {
    // https://stackoverflow.com/a/31488227/1070215
    getMatrixForRotation(cx, cy) {
      const an = this.angle;
      var ca = Math.cos((an * Math.PI) / 180);
      var sa = Math.sin((an * Math.PI) / 180);

      var a = ca.toFixed(4);
      var b = sa.toFixed(4);
      var c = (-sa).toFixed(4);
      var d = ca.toFixed(4);
      var e = (-ca * cx + sa * cy + cx).toFixed(4);
      var f = (-sa * cx - ca * cy + cy).toFixed(4);

      return "matrix(" + [a, b, c, d, e, f].join(", ") + ")";
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