<template>
  <div class="vh-100 p-2 container-lg">
    <div class="d-flex flex-column h-100">
      <div>
        <div class="d-flex w-100 text-nowrap">
          <label for="strokeWidth">Stroke Width</label>
          <vue-slider
            id="strokeWidth"
            class="mx-2 flex-grow-1"
            :contained="true"
            tooltip="none"
            v-bind="optionsStrokeWidth"
            v-model="strokeWidth"
          />
          <div class="feedback">{{ strokeWidth.toFixed(0) }}</div>
        </div>
        <div class="d-flex w-100 text-nowrap">
          <label for="angle">Angle</label>
          <vue-slider
            id="angle"
            class="mx-2 flex-grow-1"
            :contained="true"
            :interval="1"
            :max="360"
            :min="0"
            :tooltip-formatter="angleFormatter"
            tooltip="none"
            v-model="angle"
          />
          <div class="feedback">{{ angle }}°</div>
        </div>
        <div class="d-flex w-100 text-nowrap">
          <label for="scale">Scale</label>
          <vue-slider
            id="scale"
            class="mx-2 flex-grow-1"
            :contained="true"
            tooltip="none"
            v-bind="optionsScale"
            v-model="scale"
          />
          <div class="feedback">x{{ scale.toFixed(2) }}</div>
        </div>
        <div class="d-flex w-100 text-nowrap">
          <label for="blur">Blur</label>
          <vue-slider
            id="blur"
            class="mx-2 flex-grow-1"
            :contained="true"
            :interval="1"
            :max="128"
            :min="0"
            tooltip="none"
            v-model="blur"
          />
          <div class="feedback">{{ blur }}</div>
        </div>
      </div>
      <div id="svgWrapperParent" class="flex-grow-1 my-2">
        <component :is="'style'">
          {{ style }}
        </component>
        <div id="svgWrapper" v-html="src" style="visibility: hidden"></div>
      </div>
      <div class="text-center text-muted fs-6">© 2021 Christophe Thiebaud</div>
    </div>
  </div>
</template>

<style lang="scss">
body {
  height: 100vh;
  margin: 0;
  padding: 0;
}
.feedback {
  font-family: $fontFamilyMonospace, monospace;
  width: 50px;
  text-align: right;
}
#svgWrapperParent {
  position: relative;
}
#svgWrapper {
  position: absolute;
}
</style>

<script>
import VueSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min"
import "vue-slider-component/dist-css/vue-slider-component.css"
import "vue-slider-component/theme/default.css"

import { mapGetters, mapMutations } from "vuex"
import { SVG } from "@svgdotjs/svg.js"
import { cover, contain } from "intrinsic-scale"

const SW_MIN = 0
const SW_MAX = Math.round(800 / 100)

const SCALE_COUNT = 64
const SCALE_MIDDLE = 40
const SCALE_FACTOR = 1.05
const SCALE_DIVIDER = Math.pow(SCALE_FACTOR, SCALE_MIDDLE)

export default {
  name: "Icon",
  // middleware: ["auth"],
  layout: "void",
  data() {
    return {
      angleFormatter: "{value}°",
      optionsStrokeWidth: {
        data: Array.from(new Array((SW_MAX - SW_MIN) * SW_MAX + 1), (_, i) => {
          return Math.round(i == 0 ? 0 : Math.round(Math.pow(2, i / SW_MAX + SW_MIN) * SW_MAX) / SW_MAX)
        })
      },
      optionsScale: {
        data: Array.from(new Array(SCALE_COUNT), (_, i) => {
          return Math.pow(SCALE_FACTOR, i) / SCALE_DIVIDER
        })
      }
    }
  },
  components: {
    VueSlider
  },
  mounted() {
    // https://stackoverflow.com/a/42513893/1070215
    this.$nextTick(() => {
      this.onResize()
    })
    window.addEventListener("resize", this.onResize)
  },
  methods: {
    onResize() {
      // https://stackoverflow.com/a/11701129
      const svgWrapper = window.svgWrapper
      const svg = svgWrapper.getElementsByTagName("svg")[0]
      if (svg) {
        const svgRect = SVG(svg)
        const boundingBox = svgRect.bbox()
        const boundingWrapperParentRect = svgWrapper.parentNode.getBoundingClientRect()

        // https://stackoverflow.com/a/37269418
        // https://github.com/fregante/intrinsic-scale
        const renderedSize = contain(
          boundingWrapperParentRect.width,
          boundingWrapperParentRect.height,
          boundingBox.width,
          boundingBox.height
        )

        svgWrapper.setAttribute("style", `left: ${renderedSize.x}px; top : ${renderedSize.y}px; visibility: visible;`)
        svg.setAttribute("width", renderedSize.width)
        svg.setAttribute("height", renderedSize.height)
        const shrink = 40
        svgRect.viewbox(
          boundingBox.x - shrink,
          boundingBox.y - shrink,
          boundingBox.width + shrink * 2,
          boundingBox.height + shrink * 2
        )
        svgRect.transform(
          {
            scale: this.scale,
            rotate: this.angle,
            ox: 0,
            oy: 0
          },
          false
        )
      }
    },
    transformPlease: (angle, scale) => {
      const svgWrapper = window.svgWrapper
      const svg = svgWrapper.getElementsByTagName("svg")[0]
      if (svg) {
        SVG(svg).transform(
          {
            scale: scale,
            rotate: angle,
            ox: 0,
            oy: 0
          },
          false
        )
      }
    },
    ...mapMutations({
      setStrokeWidth: "user/setStrokeWidth",
      setAngle: "user/setAngle",
      setScale: "user/setScale",
      setBlur: "user/setBlur"
    })
  },
  computed: {
    src() {
      const src = require(`assets/svg/Logo_qr_code.svg?raw`)
      return src
    },
    ...mapGetters({
      user: "user/user"
    }),
    style() {
      return `
        #svgWrapper > svg path {
          filter: blur(${this.blur}px);
          stroke-width: ${this.strokeWidth};
        }
      `
    },
    strokeWidth: {
      get() {
        return this.user.strokeWidth
      },
      set(strokeWidth) {
        this.setStrokeWidth(strokeWidth)
      }
    },
    angle: {
      get() {
        return this.user.angle
      },
      set(angle) {
        this.transformPlease(angle, this.scale)
        this.setAngle(angle)
      }
    },
    scale: {
      get() {
        return this.user.scale
      },
      set(scale) {
        this.transformPlease(this.angle, scale)
        this.setScale(scale)
      }
    },
    blur: {
      get() {
        return this.user.blur
      },
      set(blur) {
        this.setBlur(blur)
      }
    }
  }
}
</script>
