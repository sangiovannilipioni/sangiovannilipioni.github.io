<template>
  <div id="patrimonio" class="container">
    <ul role="tablist" class="nav nav-tabs">
      <li role="presentation" class="nav-item">
        <a role="tab" id="0" href="#a" data-toggle="tab" :class="`nav-link ${tabIndex === 0 ? 'active' : ''}`">{{
          $t("map")
        }}</a>
      </li>
      <li role="presentation" class="nav-item">
        <a role="tab" id="1" href="#b" data-toggle="tab" :class="`nav-link ${tabIndex === 1 ? 'active' : ''}`">{{
          $t("photos")
        }}</a>
      </li>
      <li role="presentation" class="nav-item">
        <a role="tab" id="2" href="#c" data-toggle="tab" :class="`nav-link ${tabIndex === 2 ? 'active' : ''}`">{{
          $t("list")
        }}</a>
      </li>
    </ul>
    <div class="tab-content mt-3" id="myTabContent">
      <div id="a" role="tabpanel" :class="`tab-pane fade ${tabIndex === 0 ? ' show active' : ''}`">
        <div style="width: 100%; margin: 2rem 0" class="binome">
          <div
            id="map"
            class="col border d-flex justify-content-center align-items-center"
            style="background: transparent"
          >
            <div>
              <font-awesome-icon :icon="['fas', 'spinner']" class="fa-spin" />
            </div>
          </div>
          <client-only>
            <div
              id="pano"
              class="col border d-flex justify-content-center align-items-center"
              style="background: transparent; padding: 0 !important"
            ></div>
          </client-only>
        </div>
      </div>
      <div id="b" role="tabpanel" :class="`tab-pane fade ${tabIndex === 1 ? ' show active' : ''}`">
        <masonry-div :items="masonryItems" :imgDir="imgDir" />
      </div>
      <div id="c" role="tabpanel" :class="`tab-pane fade ${tabIndex === 2 ? ' show active' : ''}`">
        <div
          class="card"
          v-for="(unit, key) in units"
          v-bind:key="key"
          style="margin-bottom: 0.75rem; overflow: hidden"
        >
          <div class="d-flex" v-if="unit.imgs[0]">
            <div class="p-2 flex-grow-1">
              <span>{{ unit.title }} [{{ key }}]</span>
            </div>
            <div class="p-2" style="max-width: 30%; text-align: right">
              <NuxtLink :to="localePath(`/units/${key}`)">
                <nuxt-img class="thmb" :src="unit.imgs[0]" alt="" />
              </NuxtLink>
            </div>
          </div>
          <div class="p-2 flex-grow-1" style="text-align: center" v-if="!unit.imgs[0]">
            {{ unit.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#patrimonio {
  .thmb {
    max-width: 300px;
    height: auto;
  }
  .binome {
    height: calc(100vh - (80px + #{$footerHeight} + #{$headerHeight}));
  }
}
</style>

<script>
export default {
  // https://dev.to/bawa93/troubleshooting-and-adding-google-maps-to-individual-nuxt-js-pages-1d34
  // https://dev.to/bawa_geek/how-to-use-google-maps-in-nuxt-js-project-without-any-package-or-heavy-library-26gh
  computed: {
    tab() {
      return this.$store.state.tab.tab
    }
  },
  methods: {
    append() {},
    onActiveTab(newTab, previousTab, event) {
      this.$store.commit("tab/setTab", {
        tab: newTab
      })

      if (newTab === 1) {
        if (typeof this.$redrawVueMasonry === "function") {
          const redrawVueMasonry = this.$redrawVueMasonry
          setTimeout(function () {
            redrawVueMasonry()
          }, 200)
        }
      }
    },
    onScriptLoaded(event = null) {
      // YOU HAVE ACCESS TO "new google" now, ADD YOUR GOOGLE MAPS FUNCTIONS HERE.
      if (event) {
        // google was added
      } else {
        // google already existed
      }
      if (process.client) {
        this.initialize()
      }
    },
    async initialize() {
      const mapElement = this.mapElement || document.getElementById("map")
      const map = await new google.maps.Map(mapElement, {
        center: { lat: 41.8442301, lng: 14.5618596 },
        zoom: this.zoom,
        /* disableDefaultUI: true, */
        mapTypeControl: false,
        streetViewControl: false,
        styles: [
          {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [
              {
                visibility: "on"
              }
            ]
          },
          {
            featureType: "poi",
            stylers: [
              {
                visibility: "off"
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "on"
              }
            ]
          },
          {
            featureType: "transit",
            stylers: [
              {
                visibility: "on"
              }
            ]
          }
        ]
      })

      for (var key in this.units) {
        if (this.units.hasOwnProperty(key)) {
          let unit = this.units[key]
          if (unit.imgs[0]) {
            let content = `<p>${unit.title} [${key}]</p><p><a href="${this.localePath(`/units/${key}`)}">${this.$t(
              "goToPiantina"
            )}</a></p>`
            if (unit.hasData) {
              content = content + `<p><a href="${this.localePath(`/data/${key}`)}">${this.$t("goToSchede")}</a></p>`
            }
            const infowindow = new google.maps.InfoWindow({
              content: content,
              maxWidth: 400
            })

            const marker = new google.maps.Marker({
              position: unit.position,
              map,
              label: unit.title + " [" + key + "]"
            })

            marker.addListener("click", () => {
              infowindow.open({
                anchor: marker,
                map,
                shouldFocus: false
              })
              if (document.getElementById("otherImage")) {
                document.getElementById("otherImage").remove()
              }
              document.getElementById("pano").innerHTML =
                "<a href='" +
                this.localePath(`/units/${key}`) +
                "' style='width:100%;height:100%;'>" +
                "<div id='otherImage' style='width:100%;height:100%;background: no-repeat center center url(" +
                unit.imgs[0] +
                "); background-size: cover;'></div>" +
                "</a>"
            })
          }
        }
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.tabIndex = this.tab
    })
  },
  mounted() {
    // https://stackoverflow.com/a/42513893/1070215
    $('a[data-toggle="tab"]').on("shown.bs.tab", (event) => {
      this.onActiveTab(+event.target.id, +event.relatedTarget.id, event)
    })

    if (typeof google === "undefined") {
      __nuxt
      const script0 = document.createElement("script")
      script0.appendChild(
        document.createTextNode(
          "function gm_authFailure() {console.log('gm_authFailure!');document.getElementById('map').remove();document.getElementById('pano').remove();}"
        )
      )
      script0.type = "text/javascript"
      document.head.appendChild(script0)

      const script = document.createElement("script")
      script.onload = this.onScriptLoaded
      script.type = "text/javascript"
      script.src = `https://sleepy-cliffs-23560.herokuapp.com/proxy?scheme=https&host=maps.googleapis.com&port=443&path=maps/api/js?libraries=places&language=${this.$i18n.locale}`
      document.head.appendChild(script)
    } else {
      this.onScriptLoaded()
    }

    // masonry
    for (var key in this.units) {
      if (this.units.hasOwnProperty(key)) {
        const unit = this.units[key]
        if (unit.imgs[0]) {
          this.masonryItems.push({
            title: unit.title,
            to: "/units/" + key,
            pathShort: unit.imgs[0].slice(1)
          })
        }
      }
    }
    const f = require.context("../static/masonry", true, /\.jpg$/)
    f.keys().forEach((key) => {
      this.masonryItems.push({
        pathLong: f(key),
        pathShort: "masonry/" + key,
        disabled: true
      })
    })
  },
  async asyncData({ app, params, error }) {
    let units
    await app.$axios.get("https://sangiovannilipioni.net/json/units.json").then((response) => {
      return (units = response.data)
    })
    return { units }
  },
  data() {
    return {
      tabIndex: 0,
      mapElement: undefined,
      zoom: 16.5,

      // masonry
      masonryItems: [],
      imgDir: ""
    }
  }
}
</script>
