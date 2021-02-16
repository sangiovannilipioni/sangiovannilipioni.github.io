<template>
  <div id="qwe" style="height: 100%" class="row d-flex">
    <div id="map" class="col"></div>
    <div id="pano" class="col"></div>
  </div>
</template>
<style type="text/css">
@media (orientation: landscape) {
  body #qwe {
    flex-direction: row;
  }
}

@media (orientation: portrait) {
  body #qwe {
    flex-direction: column;
  }
}
/* #map,
#pano {
  float: left;
  height: 100%;
  width: 50%;
} */
</style> 

<script>
function gm_authFailure() {console.log('ouille');}
</script>
    <script>
async function initialize() {
  // 41.8442301,14.5618596,16z
  const fenway = { lat: 41.8442301, lng: 14.5618596 };
  const map = await new google.maps.Map(document.getElementById("map"), {
    center: fenway,
    zoom: 15.5,
    /* disableDefaultUI: true, */
    mapTypeControl: false,
  });
  const panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano"),
    {
      position: fenway,
      pov: {
        heading: 189.53,
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
  await map.setStreetView(panorama);
}

export default {
  // https://dev.to/bawa93/troubleshooting-and-adding-google-maps-to-individual-nuxt-js-pages-1d34
  // https://dev.to/bawa_geek/how-to-use-google-maps-in-nuxt-js-project-without-any-package-or-heavy-library-26gh
  methods: {
    onScriptLoaded(event = null) {
      // YOU HAVE ACCESS TO "new google" now, ADD YOUR GOOGLE MAPS FUNCTIONS HERE.
      if (event) {
        console.log("Was added");
      } else {
        console.log("Already existed");
      }
      initialize();
    },
  },
  mounted() {
    if (typeof google === "undefined") {
      
    const script0 = document.createElement("script")
      script0.appendChild(document.createTextNode("function gm_authFailure() {console.log('ouille');document.getElementById('map').remove();document.getElementById('pano').remove();}"));
      script0.type = "text/javascript";
      document.head.appendChild(script0);

      const script = document.createElement("script");
      script.onload = this.onScriptLoaded;
      script.type = "text/javascript";
      const encodedURI = encodeURI(`/maps/api/js?key=${this.$config.googleMapsApiSecret}&libraries=places&language=${this.$i18n.locale}`);
      script.src = `https://sleepy-cliffs-23560.herokuapp.com/proxy?scheme=https&host=maps.googleapis.com&port=443&path=${encodedURI}`;
      document.head.appendChild(script);

    } else {
      this.onScriptLoaded();
    }
  },
  data() {
    return {};
  },
};
</script>
