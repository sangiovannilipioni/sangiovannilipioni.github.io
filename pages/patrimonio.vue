<template>
  <div id="patrimonio" class="container-lg">
    <h1 v-if="error" class="alert alert-warning">{{ error }}</h1>
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item" role="presentation">
        <button
          :class="`nav-link ${tabIndex === 0 ? 'active' : ''}`"
          id="li_map"
          data-bs-toggle="tab"
          data-bs-target="#mapContent"
          type="button"
          role="tab"
          aria-controls="mapContent"
          aria-selected="true"
        >
          <font-awesome-icon class="text-muted" :icon="['fas', 'map-marker-alt']" />
          {{ $t("map") }}
        </button>
      </li>
      <li class="nav-item" role="presentation">
        <button
          :class="`nav-link ${tabIndex === 1 ? 'active' : ''}`"
          id="li_masonry"
          data-bs-toggle="tab"
          data-bs-target="#masonryContent"
          type="button"
          role="tab"
          aria-controls="masonryContent"
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
          data-bs-target="#listContent"
          type="button"
          role="tab"
          aria-controls="listContent"
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
        id="mapContent"
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
        id="masonryContent"
        role="tabpanel"
        aria-labelledby="li_masonry"
      >
        <!-- TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 -->
        <masonry-div :items="masonryItems" :shuffle="false"/>
        <!-- TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 TAB 2 -->
      </div>
      <div
        :class="`tab-pane fade ${tabIndex === 2 ? ' show active' : ''}`"
        id="listContent"
        role="tabpanel"
        aria-labelledby="li_list"
      >
        <!-- TAB 3 TAB 3 TAB 3 TAB 3 TAB 3 TAB 3 TAB 3 TAB 3 TAB 3 TAB 3 TAB 3 TAB 3 -->
        <div class="card table-responsive" style="margin: 0.75rem 0">
          <table id="listTable" v-if="units" class="sortable table table-striped table-hover table-borderless">
            <thead>
              <tr>
                <th scope="col">{{ $t("title") }}</th>
                <th scope="col">{{ $t("id") }}</th>
                <th scope="col">{{ $t("position") }}</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(unit, key) in units" v-bind:key="key">
                <td scope="row">
                  <span v-if="unit && unit.title">
                    <span>{{ unit.title }}</span>
                  </span>
                </td>
                <td scope="row">
                  <span class="text-muted">{{ key }}</span>
                </td>
                <td scope="row">
                  <div v-if="unit && unit.position">
                    <a
                      :href="`https://www.google.com/maps/search/?api=1&query=${unit.position.lat},${unit.position.lng}`"
                      target="_googleMaps"
                    >
                      <font-awesome-icon :icon="['fas', 'map-marker-alt']" />
                    </a>
                    <span class="monospace">[{{ unit.position.lat }}, {{ unit.position.lng }}]</span>
                  </div>
                </td>
                <td scope="row">
                  <span v-if="unit && unit.slides">
                    <nuxt-link :to="localePath(`/blueprints/${key}`)">{{ $t("blueprints") }}</nuxt-link>
                  </span>
                </td>
                <td scope="row">
                  <span v-if="unit && unit.hasData">
                    <nuxt-link :to="localePath(`/datasheets/${key}`)">{{ $t("datasheets") }}</nuxt-link>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
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
  .monospace {
    font-family: $fontFamilyMonospace, monospace;
  }
  table#listTable.sortable {
    th {
      white-space: nowrap;
    }
    th:not(.sorttable_sorted):not(.sorttable_sorted_reverse):not(.sorttable_nosort):after {
      color: gray;
      content: " \25B4\25BE";
    }
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
    },
    unitArray() {
      if (!this.units) {
        return []
      } else {
        const ret = Object.entries(this.units).map(([key, val]) => ({ key, ...val }))
        console.log(ret)
        return ret
      }
    }
  },
  head() {
    return {
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/sorttable@latest/sorttable.js"
        }
      ]
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
                let content = `<div style='font-family: "Quicksand", sans-serif'><p>
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
                  </p></div>`
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
                    text: unitkey.slice(0, 2),
                    fontSize: "12px",
                    fontWeight: "bold",
                    color: "white",
                    fontFamily: '"Quicksand", sans-serif'
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
      this.$nextTick(() => {
        const el = document.querySelector(".sortable")
        if (sorttable) {
          sorttable.makeSortable(el)
        }
      })
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

    const beforeShuffle = []
    f.keys().forEach((key) => {
      beforeShuffle.push({
        src: `/masonry/${key}`
      })
    })
    const faterShuffle = this.$store.$shuffleArray(beforeShuffle)
    this.masonryItems.push(...faterShuffle)
  },
  async asyncData({ app, params, errorHandler }) {
    let units = {},
      error
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
