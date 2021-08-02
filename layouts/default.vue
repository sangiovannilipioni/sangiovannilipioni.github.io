<!-- https://merrymaker.github.io/bs4-holygrail-layout/ -->
<template>
  <div class="d-flex flex-column vh-100">
    <MyNavBar></MyNavBar>
    <main role="main">
      <Nuxt />
    </main>
    <footer class="footer py-1" style="margin-top: auto!important;" v-if="$route.path === '/'">
      <div class="container binome">
        <div class="text-muted">
          <div style="whitespace: nowrap">Associazione <b>Nessuno Escluso</b> APS<br>Largo del Popolo, 50<br>66050 San Giovanni Lipioni (CH)</div>
        </div>
        <div class="text-muted">
          <div style="whitespace: nowrap">nessunoesclusoaps@gmail.com</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.navbar {
  z-index: 1000;
}
/* https://stackoverflow.com/a/25410621/1070215 */
a[role="menuitem"] .pdf:after {
  display: inline-block;
  content: "";
  background-image: url("/svg/PDF_file_icon.svg");
  background-size: 20px 20px;
  background-repeat: no-repeat;
  height: 20px;
  width: 20px;
  margin-left: 0.5rem;
}
</style>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("auth", ["loggedIn"]),
    currentLocale() {
      return this.$i18n.locale;
    },
  },
  data() {
    return {
      packageVersion: process.env.packageVersion,
      gitUrl:
        "https://github.com/sangiovannilipioni/sangiovannilipioni.github.io/commit/" +
        process.env.NUXT_ENV_CURRENT_GIT_SHA,
    };
  },
};
</script>

