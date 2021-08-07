<template>
    <div>
      <div class="container flex">
        <h1 id="theTitle">
          Associazione <span style="font-weight: 700">Nessuno Escluso</span> APS
        </h1>
        <div
          style="height: 400px; max-height: 30%; width: 100%; margin: 2rem 0"
          class="binome"
        >
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
          >
            <font-awesome-icon :icon="['fas', 'spinner']" class="fa-spin" />
          </div>
        </div>
        <p style="font-size: larger" v-html="$t('pres1')">
        </p><p v-html="$t('pres2')">
        </p><p v-html="$t('pres3')">
        </p><p v-html="$t('pres4')">          
        </p>
        <ol>
          <li v-html="$t('pres5_li1')"></li>
          <li v-html="$t('pres5_li2')"></li>
          <li v-html="$t('pres5_li3')"></li>  
          <li v-html="$t('pres5_li4')"></li>
        </ol>
        <p v-html="$t('pres6')"></p>
      </div>
    </div>
</template>

<style type="text/css" scoped>
h1 {
  text-align: center;
}
</style> 

<script>
function gm_authFailure() {
  console.log("ouille");
}
</script>

<script>

export default {
  // https://dev.to/bawa93/troubleshooting-and-adding-google-maps-to-individual-nuxt-js-pages-1d34
  // https://dev.to/bawa_geek/how-to-use-google-maps-in-nuxt-js-project-without-any-package-or-heavy-library-26gh
  methods: {
    onScriptLoaded(event = null) {
      console.log('onScriptLoaded', event);
      // YOU HAVE ACCESS TO "new google" now, ADD YOUR GOOGLE MAPS FUNCTIONS HERE.
      if (event) {
        console.log("google was added");
      } else {
        console.log("google already existed");
      }
      if(process.client){
        this.initialize()
      }
    },
    async initialize () {
      console.log('initializing google maps ...');
      const piazza = {
        position: { lat: 41.8442301, lng: 14.5618596 },
        heading: 189.53,
      };
      const farmacia = {
        position: { lat: 41.8428559, lng: 14.5619902 },
        heading: 159.68,
      };
      const prova = {
        position: { lat: 41.84428, lng: 14.56181 },
        heading: 159.68,
      };
      const mapElement = this.mapElement || document.getElementById("map")
      console.log('about to const map = await new google.maps.Map', mapElement, document.getElementById("map"));
      const map = await new google.maps.Map(mapElement, {
        center: piazza.position,
        zoom: this.zoom,
        /* disableDefaultUI: true, */
        mapTypeControl: false,
        streetViewControl: false,
      });
      console.log('about to const panorama = new google.maps.StreetViewPanorama');
      const panorama = new google.maps.StreetViewPanorama(
        document.getElementById("pano"),
        {
          position: farmacia.position,
          pov: {
            heading: farmacia.heading,
            pitch: 0,
            zoom: 1,
          },
          addressControlOptions: {
            position: google.maps.ControlPosition.TOP_LEFT,
          },
          linksControl: false,
          panControl: false,
          enableCloseButton: false,
        }
      );
      const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<div id="bodyContent">' +
        "<p><b>San Giovanni Lipioni</b> è un comune italiano di 152 abitanti della provincia di Chieti in Abruzzo.</p>" +
        '<p>cf. <a href="https://it.wikipedia.org/wiki/San_Giovanni_Lipioni">' +
        "https://it.wikipedia.org/wiki/San_Giovanni_Lipioni</a> " +
        "</p>" +
        "</div>" +
        "</div>";

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 400,
      });

      const marker = new google.maps.Marker({
        position: piazza.position,
        map,
        label: "San Giovanni Lipioni",
      });

      marker.addListener("click", () => {
        document.getElementById('otherImage')
        infowindow.open({
          anchor: marker,
          map,
          shouldFocus: false,
        });
      });

      console.log('about to map.setStreetView(panorama)');

      await map.setStreetView(panorama);

      console.log('google maps initialized !');

    }
  },
  mounted() {
    console.log("MOUNTED map element >>> ", document.getElementById("theTitle"), this.mapElement);
    if (typeof google === "undefined") {__nuxt
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
      mapElement: undefined,
      zoom: 7
    };
  },
};
</script>

