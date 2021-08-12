import Vue from 'vue'
import mediumZoom from 'medium-zoom'

const initZoom = () => {
  mediumZoom('img.zoom:not(.medium-zoom-image)', {
    margin: 0,
    background: 'rgba(0,0,0,.666)',
    scrollOffset: 0,
  })
}

Vue.mixin({
  mounted: function() {
    initZoom()
  },
  updated: function() {
    initZoom()
  },
})