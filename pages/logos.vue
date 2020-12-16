<template>
  <div class="logos mx-auto">
    <!-- https://github.com/nuxt/nuxt.js/issues/6645#issuecomment-550111141 -->
    <component :is="'style'">
      @media (min-width: 540px) { .logo svg path { stroke-width:
      {{ strokeWidth }}; } } @media (max-width: 540px) { .logo svg path {
      stroke-width: {{ strokeWidth }}; } } .logo svg path { stroke-width:
      {{ strokeWidth }}; } .logos svg > g { transform: translate(-20px,-250px)
      {{ getMatrixForRotation(310, 535) }}; }
    </component>
    <b-form id="strokeWidthForm" class="form-inline">
      <div class="blah d-flex w-100">
        <label class="mr-3" for="strokeWidth">Stroke Width</label>
        <vue-slider
          id="strokeWidth"
          v-model="strokeWidth"
          v-bind="options1"
          @change="setScale"
          class="d-inline-flex flex-grow-1"
        />
        <div class="feedback ml-3">{{ strokeWidth }}</div>
      </div>
      <div class="d-flex w-100">
        <label class="mr-3" for="angle">Angle</label>
        <vue-slider
          id="angle"
          v-model="angle"
          :min="0"
          :max="360"
          :interval="1"
          class="d-inline-flex flex-grow-1"
        />
        <div class="feedback ml-3">{{ angle }}</div>
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
import VueSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min";
import "vue-slider-component/dist-css/vue-slider-component.css";
import "vue-slider-component/theme/default.css";

const MIN_SCALE = 0;
const MAX_SCALE = 12;

export default {
  name: "Icon",
  data() {
    return {
      angle: 180,
      strokeWidth: Math.pow(10, 2),
      scale: MIN_SCALE,
      options1: {
        data: Array.from(new Array(MAX_SCALE - MIN_SCALE + 1), (_, i) =>
          Math.pow(2, i + MIN_SCALE)
        ),
      },
      options2: {
        min: MIN_SCALE,
        max: MAX_SCALE,
      },
    };
  },
  components: {
    VueSlider,
  },
  methods: {
    setScale: function () {
      this.scale = Math.round(Math.log(this.strokeWidth) / Math.log(2));
    },
    setValue: function () {
      this.strokeWidth = Math.pow(2, this.scale);
    },
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