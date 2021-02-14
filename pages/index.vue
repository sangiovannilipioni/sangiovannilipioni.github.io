<template>
  <div id="qwe" style="height: 100%" class="row d-flex">
    <div id="map" class="col" ></div>
    <div id="pano" class="col" ></div>
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
function initialize() {
  // 41.8442301,14.5618596,16z
  const fenway = { lat: 41.8442301, lng: 14.5618596 };
  const map = new google.maps.Map(document.getElementById("map"), {
    center: fenway,
    zoom: 16,
    disableDefaultUI: true,
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
        position: google.maps.ControlPosition.TOP_CENTER,
      },
      linksControl: false,
      panControl: false,
      enableCloseButton: false,
    }
  );
  map.setStreetView(panorama);
}
const apiKey = "AIzaSyBC_WlQhwb4Cq8BeR1UEzsrifeynQVsejU"; // Package: @nuxtjs/dotenv

export default {
  head() {
    return {
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=${this.$i18n.locale}`,
        },
      ],
    };
  },
  methods: {},
  mounted() {
    initialize();
    /*     var input = this.$refs.searchTextField; //.getElementById('searchTextField');
    new google.maps.places.Autocomplete(input);
 */
  },
  data() {
    return {};
  },
};
</script>
