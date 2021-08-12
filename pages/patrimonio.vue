<template>
  <div id="patrimonio" class="container">
    <b-tabs content-class="mt-3">
      <b-tab :title="$t('map')" active>
        <div style="width: 100%; margin: 2rem 0" class="binome">
          <div
            id="map"
            class="col d-flex justify-content-center align-items-center"
            style="background: transparent"
          >
            <div>
              <font-awesome-icon :icon="['fas', 'spinner']" class="fa-spin" />
            </div>
          </div>
          <client-only>
            <div
              id="pano"
              class="col d-flex justify-content-center align-items-center"
              style="background: transparent; padding: 0 !important;"
            ></div>
          </client-only>
        </div>
      </b-tab>
      <b-tab :title="$t('photos')">
        <div id="photoGallery">
          <vue-masonry-wall :items="units" :options="masonryOptions" @append="append">
            <div class="grid-sizer" />
            <template v-slot:default="{ item }">
              <div class="Item grid-item">
                <b-img class="Img Content" :src="item.foto" />
              </div>
            </template>
          </vue-masonry-wall>
        </div>
      </b-tab>
      <b-tab :title="$t('list')">
        <b-card
          v-for="unit in units"
          v-bind:key="unit.index"
          style="margin-bottom: 0.75rem; overflow: hidden"
        >
          <div class="d-flex" v-if="unit.foto">
            <div class="p-2 flex-grow-1">
              <span>{{ unit.key }}</span>
            </div>
            <div class="p-2" style="max-width: 30%; text-align: right">
              <NuxtLink :to="`/units/${unit.ref}`">
                <nuxt-img class="thmb" :src="unit.foto" alt="" />
              </NuxtLink>
            </div>
          </div>
          <div
            class="p-2 flex-grow-1"
            style="text-align: center"
            v-if="!unit.foto"
          >
            {{ unit.key }}
          </div>
        </b-card>
      </b-tab>
    </b-tabs>
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
  .Item {
    overflow: hidden;
    border-radius: 4px;
    width: 100%;
    
    background: #f5f5f5;
  }
  .Content {
    padding: 20px;
  }
  .Img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    line-height: 0;
    display: block;
  }
  .grid-sizer,
  .grid-item  {
     width: 20%; 
  }
}
</style>

<script>

import VueMasonryWall from "vue-masonry-wall";

export default {
  // https://dev.to/bawa93/troubleshooting-and-adding-google-maps-to-individual-nuxt-js-pages-1d34
  // https://dev.to/bawa_geek/how-to-use-google-maps-in-nuxt-js-project-without-any-package-or-heavy-library-26gh
  components: { VueMasonryWall },
  methods: {
    append() {},
    onScriptLoaded(event = null) {
      console.log("onScriptLoaded", event);
      // YOU HAVE ACCESS TO "new google" now, ADD YOUR GOOGLE MAPS FUNCTIONS HERE.
      if (event) {
        console.log("google was added");
      } else {
        console.log("google already existed");
      }
      if (process.client) {
        this.initialize();
      }
    },
    async initialize() {
      console.log("initializing google maps ...");
      const mapElement = this.mapElement || document.getElementById("map");
      console.log(
        "about to const map = await new google.maps.Map",
        mapElement,
        document.getElementById("map")
      );
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
                visibility: "on",
              },
            ],
          },
          {
            featureType: "poi",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "transit",
            stylers: [
              {
                visibility: "on",
              },
            ],
          },
        ],
      });

      this.units.forEach((unit) => {
        if (unit.foto) {
          console.log(unit);

          const infowindow = new google.maps.InfoWindow({
            content: `<p>${unit.key}</p><p><a href="/units/${unit.ref}">Vai alla scheda</a></p>`,
            maxWidth: 400,
          });

          const marker = new google.maps.Marker({
            position: unit.position,
            map,
            label: unit.key,
          });

          marker.addListener("click", () => {
            infowindow.open({
              anchor: marker,
              map,
              shouldFocus: false,
            });
            if (document.getElementById("otherImage")) {
              document.getElementById("otherImage").remove();
            }
            if (true) {
              document.getElementById("pano").innerHTML =
                "<a href='/units/" +
                unit.ref +
                "' style='width:100%;height:100%;'>" +
                "<div id='otherImage' style='width:100%;height:100%;background: no-repeat center center url(" +
                unit.foto +
                "); background-size: cover;'></div>" +
                "</a>";
            } else {
              document.getElementById("pano").innerHTML =
                "<video playsinline autoplay loop><source :src='" +
                unit.video +
                "' type='video/mp4' />Sorry, your browser doesn't support embedded videos.</video>";
            }
          });
        }
      });

      console.log("google maps initialized !");
    },
  },
  mounted() {
    console.log(
      "MOUNTED map element >>> ",
      document.getElementById("theTitle"),
      this.mapElement
    );
    if (typeof google === "undefined") {
      __nuxt;
      const script0 = document.createElement("script");
      script0.appendChild(
        document.createTextNode(
          "function gm_authFailure() {console.log('ouille');document.getElementById('map').remove();document.getElementById('pano').remove();}"
        )
      );
      script0.type = "text/javascript";
      document.head.appendChild(script0);

      const script = document.createElement("script");
      script.onload = this.onScriptLoaded;
      script.type = "text/javascript";
      script.src = `https://sleepy-cliffs-23560.herokuapp.com/proxy?scheme=https&host=maps.googleapis.com&port=443&path=maps/api/js?libraries=places&language=${this.$i18n.locale}`;
      document.head.appendChild(script);
    } else {
      this.onScriptLoaded();
    }

    // masonry
    const f = require.context("../static/jpeg", true, /\.jpg$/);
    f.keys().forEach((key) => {
      // this.masonryItems.push({ key: f(key), src: '/jpeg/'+key });
      /* this.units.push(
        { key: f(key), foto: '/jpeg/' + key }
      ); */
    });

  },
  data() {
    return {
      units: [
        {
          key: "Via Roma, 37",
          value: "qwe",
          foto: "/foto/GOPR1232_light_2.jpg",
          position: { lat: 41.84247, lng: 14.56213 },
          ref: "O02",
          video:
            "https://storage.googleapis.com/sangiovannilipioni/SGL_DA_silent_1080.mov",
        },
        {
          key: "Via Vicenne, 4",
          value: "asd",
          foto: "/foto/X2.jpg",
          position: { lat: 41.84821126881966, lng: 14.562941327400237 },
          ref: "G01",
        },
        { key: "⋮"},
      ],
      mapElement: undefined,
      zoom: 16.8,
      masonryItems: [],
      masonryOptions: {
        columnWidth: '.grid-sizer',
        itemSelector: '.grid-item',
        percentPosition: true,
        gutter: 10
      },
    };
  },
};
</script>

