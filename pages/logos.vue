<template>
  <div class="mx-auto container">
    <!-- https://github.com/nuxt/nuxt.js/issues/6645#issuecomment-550111141 -->
    <component :is="'style'">
      @media (min-width: 540px) { 
          .logo svg path { 
              stroke-width: {{ strokeWidth }}; 
          } 
      } 
      @media (max-width: 540px) { 
          .logo svg path {
              stroke-width: {{ strokeWidth }}; 
          } 
      } 
      .logo svg path { 
          stroke-width: {{ strokeWidth }}; 
      } 
      .logo svg > g { 
          transform: {{ getMatrixForRotation(310, 535) }}; 
      }
    </component>
    <form id="strokeWidthForm" class="form-inline">
      <div class="white-space-nowrap d-flex w-100">
        <label class="mr-3" for="strokeWidth">Stroke Width</label>
        <vue-slider
          id="strokeWidth"
          v-model="strokeWidth"
          v-bind="options"
          class="d-inline-flex flex-grow-1 p-7"
          style="padding:7px 12px;"
        />
        <div class="feedback ml-3">{{ formatnum(strokeWidth) }}</div>
      </div>
      <div class="d-flex w-100">
        <label class="mr-3" for="angle">Angle</label>
        <vue-slider
          id="angle"
          v-model="angle"
          :min="0"
          :max="360"
          :interval="1"
          :tooltip-formatter="angleFormatter"
          class="d-inline-flex flex-grow-1"
          style="padding:7px 12px;"
        />
        <div class="feedback ml-3">{{ angle }}°</div>
      </div>
    </form>
    <div
      v-html="src"
      class="logo blurp2 d-flex justify-content-center align-items-center"
    ></div>
  </div>
</template>

<style>
.blurp2 svg {
  width: 100%;
  height: calc(100vh - 80px);
}
.white-space-nowrap {
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

import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Icon",
  middleware: ["auth"],
  layout: 'void',
  data() {
    return {
      // angle: 0,
      // strokeWidth: Math.pow(2, 4),
      scale: 4,
      angleFormatter: "{value}°",
      options: {
        data: Array.from(
          new Array((MAX_SCALE - MIN_SCALE) * 12 + 1),
          (_, i) => {
            return i == 0
              ? 0
              : Math.round(Math.pow(2, i / 12 + MIN_SCALE) * 100) / 100;
          }
        ),
      },
    };
  },
  components: {
    VueSlider,
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
    formatnum: (n) => {
      return n ? n.toFixed(2).padStart(7, " ") : "?";
    },
    ...mapMutations({
      setStrokeWidth: "user/setStrokeWidth",
      setAngle: "user/setAngle",
    }),
  },
  computed: {
    src() {
      const src = require(`assets/svg/Logo_qr_code.svg?raw`);
      return src;
    },
    ...mapGetters({
      user: "user/user",
    }),
    strokeWidth: {
      get() {
        return this.user.strokeWidth;
      },
      set(strokeWidth) {
        this.setStrokeWidth(strokeWidth);
      },
    },
    angle: {
      get() {
        return this.user.angle;
      },
      set(angle) {
        this.setAngle(angle);
      },
    },
  },
};
</script>