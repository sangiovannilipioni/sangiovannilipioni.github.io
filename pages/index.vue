<template>
  <!-- 
  <font-awesome-icon v-if="$auth.$state.loggedIn" :icon="['fas', 'spinner']" class="fa-pulse" style="color:blue; width:50%; height:100%; margin: auto;"></font-awesome-icon>
                     v-else
  -->
  <div style="height: 100%">
    <div class="d-flex flex-row-reverse bd-highlight m-4">
      <nav class="nav flex-column border">
        <a class="nav-link" href="#">Area Riservata</a>
        <a class="nav-link" href="#">Progetto</a>
        <a class="nav-link" href="#">Riabitare San Giovanni</a>
      </nav>
    </div>
    <div class="container flex" style="height: 100%">
      <h1>Associazione Nessuno Escluso APS</h1>
      <div
        id="qwe"
        style="height: 25%; width: 100%; margin: 2rem 0"
        class="row d-flex"
      >
        <div
          id="map"
          class="col"
          style="background: transparent; margin-right: 2rem"
        ></div>
        <div
          id="pano"
          class="col"
          style="background: transparent; margin-left: 2rem"
        ></div>
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
    <footer class="footer mt-auto py-3">
      <div class="container">
        <span class="text-muted">
          <p>Associazione APS “NESSUNO ESCLUSO”</p>

          <p>Piazza Largo del Popolo, 50</p>

          <p>66050 San Giovanni Lipioni (CH)</p>

          <p>nessunoesclusoaps@gmail.com</p>
        </span>
      </div>
    </footer>
  </div>
</template>
<style type="text/css" scoped>
h1 {
  text-align: center;
}
#qwe_ {
  background: url("/svg/Logo_qr_code_animated.svg") no-repeat center center
    fixed;
  background-size: contain;
}
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
</style> 

<script>
function gm_authFailure() {
  console.log("ouille");
}
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
