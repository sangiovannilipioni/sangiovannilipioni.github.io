(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{385:function(t,e,n){},387:function(t,e,n){"use strict";n(385)},388:function(t,e,n){"use strict";n.r(e);var r={props:{items:{default:function(){return[]},type:Array,required:!1},shuffle:{default:!0,type:Boolean,required:!1}},computed:{shuffled:function(){return this.shuffle?this.$store.$shuffleArray(this.items):this.items}},mounted:function(){"function"==typeof this.$redrawVueMasonry&&this.$redrawVueMasonry()}},l=(n(387),n(8)),component=Object(l.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container-lg d-flex justify-content-center",attrs:{id:"photoGallery"}},[n("div",{directives:[{name:"masonry",rawName:"v-masonry"}],attrs:{id:"VueMasonry","fit-width":"true"}},t._l(t.shuffled,(function(e,r){return n("div",{directives:[{name:"masonry-tile",rawName:"v-masonry-tile"}],key:r,staticClass:"Item"},[e.to?n("nuxt-link",{attrs:{to:t.localePath(e.to)}},[n("img",{staticClass:"Img Content masonryImage",attrs:{src:e.src,title:e.title}})]):n("img",{staticClass:"Img Content zoom masonryImage",attrs:{src:e.src,title:e.title,"data-color":"gray"}}),t._v(" "),e.didascalia?n("div",{staticClass:"Didascalie"},[t._v("\n        "+t._s(e.didascalia.text)+"\n        "),e.didascalia.link?n("span",[e.didascalia.link.to?n("nuxt-link",{attrs:{to:t.localePath(e.didascalia.link.to)}},[t._v("\n            "+t._s(e.didascalia.link.text)+"\n          ")]):n("span",{staticClass:"text-muted"},[t._v("\n            "+t._s(e.didascalia.link.text)+"\n          ")])],1):t._e()]):t._e()],1)})),0)])}),[],!1,null,"97ffaa7a",null);e.default=component.exports}}]);