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
          <div
            id="pano"
            class="col d-flex justify-content-center align-items-center"
            style="background: transparent"
          ></div>
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
              <img class="thmb" :src="'/foto/' + unit.foto" alt="" />
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

<style scoped lang="scss">
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
  methods: {
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
            document.getElementById("pano").innerHTML =
              "<a href='/units/"+unit.ref+"' style='width:100%;height:100%;'>"+
              "<div id='otherImage' style='width:100%;height:100%;background: no-repeat center center url(/foto/"+unit.foto+"); background-size: contain;'>"+
              "</div></a>";
    
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
  },
  data() {
    return {
      units: [
        { key: "Via Roma, 37", value: "qwe", foto: "GOPR1232_light_2.jpg", position: { lat: 41.84247, lng: 14.56213 }, ref: "A02"}, 
        { key: "Via Vicenne. 4", value: "asd", foto: "X2.jpg", position: { lat: 41.84821126881966, lng: 14.562941327400237}, ref: "G01"  }, 
        { key: "⋮", value: "zxc" },
      ],
      mapElement: undefined,
      zoom: 16.80,
    };
  },
};
</script>

