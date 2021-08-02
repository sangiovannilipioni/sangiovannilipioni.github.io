<template>
  <div>
    <div class="container flex" >
      <h1 id="theTitle">Associazione <span style="font-weight:700">Nessuno Escluso</span> APS</h1>
      <div
        style="height: 400px; max-height: 30%; width: 100%; margin: 2rem 0;"
        class="binome"
      >
        <div
          id="map"
          class="col d-flex justify-content-center align-items-center"
          style="background: transparent;"
        ><div><font-awesome-icon :icon="['fas', 'spinner']" class="fa-spin"/></div></div>
        <div
          id="pano"
          class="col d-flex justify-content-center align-items-center"
          style="background: transparent;"
        ><font-awesome-icon :icon="['fas', 'spinner']" class="fa-spin"/></div>
      </div>
      <p style="font-size: larger">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <p>
        Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci
        vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula
        non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros
        vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis.
        Curabitur aliquet pellentesque diam. Integer quis metus vitae elit
        lobortis egestas. Lorem ipsum dolor sit amet, consectetuer adipiscing
        elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien.
        Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam.
        Mauris ullamcorper felis vitae erat. Proin feugiat, augue non elementum
        posuere, metus purus iaculis lectus, et tristique ligula justo vitae
        magna.
      </p>
      <p>
        Aliquam convallis sollicitudin purus. Praesent aliquam, enim at
        fermentum mollis, ligula massa adipiscing nisl, ac euismod nibh nisl eu
        lectus. Fusce vulputate sem at sapien. Vivamus leo. Aliquam euismod
        libero eu enim. Nulla nec felis sed leo placerat imperdiet. Aenean
        suscipit nulla in justo. Suspendisse cursus rutrum augue. Nulla
        tincidunt tincidunt mi. Curabitur iaculis, lorem vel rhoncus faucibus,
        felis magna fermentum augue, et ultricies lacus lorem varius purus.
        Curabitur eu amet.
      </p>
    </div>
  </div>
</template>

<style type="text/css" scoped>
h1 {
  text-align: center;
}

.binome .fa-spin {
  color:lightgray; 
  font-size: 32pt;
}
</style> 

<script>
function gm_authFailure() {
  console.log("ouille");
}
</script>

<script>
async function initialize() {
  const piazza = { position : { lat: 41.8442301, lng: 14.5618596 }, heading : 189.53 };
  const farmacia = { position : { lat: 41.8428559, lng: 14.5619902 }, heading : 159.68 };
  const map = await new google.maps.Map(document.getElementById("map"), {
    center: piazza.position,
    zoom: 7,
    /* disableDefaultUI: true, */
    mapTypeControl: false,
    streetViewControl: false 
  });
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
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
  });

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
    return {};
  },
};
</script>
