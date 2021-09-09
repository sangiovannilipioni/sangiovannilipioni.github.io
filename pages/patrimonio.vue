<template>
  <div id="patrimonio" class="container-lg">
    <h1 v-if="error" class="alert alert-warning">{{ error }}</h1>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          :class="`nav-link ${tabIndex === 0 ? 'active' : ''}`"
          id="li_map"
          data-bs-toggle="tab"
          data-bs-target="#home"
          type="button"
          role="tab"
          aria-controls="home"
          aria-selected="true"
        >
          <font-awesome-icon class="text-muted" :icon="['fas', 'map-marker']" />
          {{ $t("map") }}
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          :class="`nav-link ${tabIndex === 1 ? 'active' : ''}`"
          id="li_masonry"
          data-bs-toggle="tab"
          data-bs-target="#profile"
          type="button"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
        >
          <font-awesome-icon class="text-muted" :icon="['fas', 'images']" />
          {{ $t("photos") }}
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          :class="`nav-link ${tabIndex === 2 ? 'active' : ''}`"
          id="li_list"
          data-bs-toggle="tab"
          data-bs-target="#contact"
          type="button"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >
          <font-awesome-icon class="text-muted" :icon="['fas', 'list']" />
          {{ $t("list") }}
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          :class="`nav-link ${tabIndex === 3 ? 'active' : ''}`"
          id="li_collab_da"
          data-bs-toggle="tab"
          data-bs-target="#collab_da"
          type="button"
          role="tab"
          aria-controls="collab_da"
          aria-selected="false"
        >
          <font-awesome-icon class="text-muted" :icon="['fas', 'info-circle']" />
          {{ $t("collab_da") }}
        </button>
      </li>
    </ul>
    <div class="tab-content" id="myTabContent">
      <div
        :class="`tab-pane fade ${tabIndex === 0 ? ' show active' : ''}`"
        id="home"
        role="tabpanel"
        aria-labelledby="li_map"
      >
        <!-- TAB 1 TAB 1 TAB 1 TAB 1 TAB 1 TAB 1 TAB 1 TAB 1 TAB 1 TAB 1 TAB 1 TAB 1 -->
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
            >
              <span class="text-muted">{{ $t("helpPatrimoine") }}</span>
            </div>
          </client-only>
        </div>
        <!-- TAB 1 TAB 1 TAB 1 TAB 1 TAB 1 TAB 1 TAB 1 TAB 1 TAB 1 TAB 1 TAB 1 TAB 1 -->
      </div>
      <div
        :class="`tab-pane fade ${tabIndex === 1 ? ' show active' : ''}`"
        id="profile"
        role="tabpanel"
        aria-labelledby="li_masonry"
      >
        <!-- TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 -->
        <masonry-div :items="masonryItems" />
        <!-- TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 -->
      </div>
      <div
        :class="`tab-pane fade ${tabIndex === 2 ? ' show active' : ''}`"
        id="contact"
        role="tabpanel"
        aria-labelledby="li_list"
      >
        <!-- TAB 3 TAB 3 TAB 3 TAB 3 TAB 3 TAB 3 TAB 3 TAB 3 TAB 3 TAB 3 TAB 3 TAB 3 -->
        <div
          class="card"
          v-for="(unit, key) in units"
          v-bind:key="key"
          style="margin-bottom: 0.75rem; overflow: hidden"
        >
          <div v-if="unit">
            <div class="d-flex">
              <div class="p-2 flex-grow-1">
                <span>{{ unit.title || key }}</span>
                <nuxt-link v-if="unit.hasData" :to="localePath(`/datasheets/${key}`)"> [{{ key }}] </nuxt-link>
                <span v-else class="text-muted">[{{ key }}]</span>
              </div>
              <div v-if="unit.imgs && unit.imgs[0]" class="p-2" style="max-width: 30%; text-align: right">
                <nuxt-link :to="localePath(`/blueprints/${key}`)">
                  <img class="thmb" :src="`${$axios.defaults.baseURL}/unit/${key}/image/${unit.imgs[0]}`" alt="" />
                </nuxt-link>
              </div>
            </div>
          </div>
          <div v-else class="p-2 flex-grow-1" style="text-align: center">
            {{ key }}
          </div>
        </div>
        <!-- TAB 3 TAB 3 TAB 3 TAB 3 TAB 3 TAB 3 TAB 3 TAB 3 TAB 3 TAB 3 TAB 3 TAB 3 -->
      </div>
      <div
        :class="`tab-pane fade ${tabIndex === 3 ? ' show active' : ''}`"
        id="collab_da"
        role="tabpanel"
        aria-labelledby="li_collab_da"
      >
        <!-- TAB 4 TAB 4 TAB 4 TAB 4 TAB 4 TAB 4 TAB 4 TAB 4 TAB 4 TAB 4 TAB 4 TAB 4 -->
        <CollabDA />
        <!-- TAB 4 TAB 4 TAB 4 TAB 4 TAB 4 TAB 4 TAB 4 TAB 4 TAB 4 TAB 4 TAB 4 TAB 4 -->
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
    onTabShown(event) {
      for (let i = 0; i < this.lis.length; i++) {
        if (event.target.id === this.lis[i]) {
          this.$store.commit("tab/setTab", {
            tab: i
          })

          if (i === 1) {
            if (typeof this.$redrawVueMasonry === "function") {
              const redrawVueMasonry = this.$redrawVueMasonry
              this.$nextTick(() => {
                redrawVueMasonry()
              })
            }
          }
          return
        }
      }
    },
    append() {},
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
      if (typeof google !== "undefined") {
        const mapElement = this.mapElement || document.getElementById("map")
        if (mapElement) {
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

          for (const key in this.units) {
            if (this.units.hasOwnProperty(key)) {
              const unit = this.units[key]
              const unitkey = key
              const unititle = unit.title || key
              if (unit && unitkey && unititle) {
                let content = `<p>
                    ${unititle} [${key}]
                  </p>
                  <p>
                    <a href="${this.localePath(`/blueprints/${unitkey}`)}">
                      ${this.$t("gotoBlueprints")}
                    </a>
                  </p>`
                const contentPlus = `<p>
                    <a href="${this.localePath(`/datasheets/${unitkey}`)}">
                      ${this.$t("gotoDatasheets")}
                    </a>
                  </p>`
                if (unit.hasData) {
                  content = content + contentPlus
                }

                const infowindow = new google.maps.InfoWindow({
                  content: content,
                  maxWidth: 400
                })

                const marker = new google.maps.Marker({
                  position: unit.position,
                  map,
                  label: {
                    text: unititle,
                    fontSize: "16px",
                    fontFamily: '"Poppins", sans-serif'
                  }
                })

                marker.addListener("click", (e) => {
                  infowindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: false
                  })
                  if (document.getElementById("otherImage")) {
                    document.getElementById("otherImage").remove()
                  }
                  const innerHTML = `<a href="${this.localePath(`/blueprints/${unitkey}`)}" style="
                        width: 100%;
                        height: 100%;
                      "
                    >
                    <div 
                      id="otherImage" 
                      style="
                        width: 100%;
                        height: 100%;
                        background-size: cover;
                        background: no-repeat center center url(${this.$axios.defaults.baseURL}/unit/${unitkey}/image/${
                    unit.imgs[0]
                  });
                      "
                    >
                    </div>
                  </a>
                  `
                  document.getElementById("pano").innerHTML = innerHTML
                })
              }
            }
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
  beforeDestroy() {
    for (let i = 0; i < this.lis.length; i++) {
      const li = document.querySelector("#" + this.lis[i])
      if (li) {
        li.removeEventListener("shown.bs.tab", this.onTabShown)
      }
    }
  },
  mounted() {
    // https://stackoverflow.com/a/42513893/1070215
    this.$nextTick(() => {
      for (let i = 0; i < this.lis.length; i++) {
        const li = document.querySelector("#" + this.lis[i])
        if (li) {
          li.addEventListener("shown.bs.tab", this.onTabShown)
        }
      }
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
        const unitkey = key
        const unititle = unit.title || key
        if (unit && unitkey && unititle && unit.imgs && unit.imgs[0]) {
          this.masonryItems.push({
            didascalia: {
              text: unititle,
              link: {
                text: `[${unitkey}]`,
                to: unit.hasData ? `/datasheets/${unitkey}` : undefined
              }
            },
            to: `/blueprints/${unitkey}`,
            title: `[${unitkey}]`,
            src: `${this.$axios.defaults.baseURL}/unit/${unitkey}/image/${unit.imgs[0]}`
          })
        }
      }
    }
    const f = require.context("../static/masonry", true, /\.jpg$/)
    f.keys().forEach((key) => {
      this.masonryItems.push({
        src: `/masonry/${key}`
      })
    })
  },
  async asyncData({ app, params, errorHandler }) {
    let units = {}, error
    await app.$axios.get("/units.json").then(
      (response) => {
        units = response.data
      },
      (e) => {
        console.log(Object.keys(e))
        error = `${e.address}:${e.port} ${app.i18n.t("no_longer_answer")}`
      }
    )
    return { units, error }
  },
  data() {
    return {
      tabIndex: 0,
      lis: ["li_map", "li_masonry", "li_list", "li_collab_da"],
      mapElement: undefined,
      zoom: 16.5,

      // masonry
      masonryItems: [],
      imgDir: ""
    }
  }
}
</script>
