<!-- https://merrymaker.github.io/bs4-holygrail-layout/ -->
<template>
  <div class="d-flex flex-column vh-100">
    <MyNavBar />
    <!-- b-navbar toggleable="sm">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand
        ><NuxtLink :to="localePath('/')"><Logo /></NuxtLink
      ></b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav class="mr-auto">
          <b-nav-item-dropdown>
            <template slot="button-content">{{ $t("whoWeAre") }}</template>
            <b-dropdown-item :to="localePath('/blog/presentazione')">{{
              $t("exordium")
            }}</b-dropdown-item>
            <b-dropdown-item :to="localePath('/blog/direttivo')">{{
              $t("dictators")
            }}</b-dropdown-item>
            <b-dropdown-item
              :to="localePath('/embedded_pdf/Atto_Costitutivo_e_Statuto')"
              ><span class="pdf">{{
                $t("administrivia")
              }}</span></b-dropdown-item
            >
          </b-nav-item-dropdown>

          <b-nav-item-dropdown>
            <template slot="button-content">{{ $t("theProject") }}</template>
            <b-dropdown-item
              :to="
                localePath(
                  '/embedded_pdf/Programma_x_San_Giovanni_Finale_Giugno_2020_pptx'
                )
              "
              ><span class="pdf"
                >Programma x San_Giovanni Finale Giugno 2020</span
              ></b-dropdown-item
            >
            <b-dropdown-item  :to="localePath('/slides')">{{
              $t("slides")
            }}</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown>
            <template slot="button-content">{{ $t("media") }}</template>
            <b-dropdown-item :to="localePath('/gallery')">{{
              $t("pictures")
            }}</b-dropdown-item>
            <b-dropdown-item :to="localePath('/videos')">{{
              $t("movies")
            }}</b-dropdown-item>
            <b-dropdown-item :to="localePath('/blog/internet')">{{
              $t("internet")
            }}</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown>
            <template slot="button-content">{{ $t("contacts") }}</template>
            <b-dropdown-item :to="localePath('/blog/contatti')">{{
              $t("contacts")
            }}</b-dropdown-item>
            <b-dropdown-item
              to="/pdf/Domanda_di_Ammissione_a_Socio.pdf"
              target="_blank"
              ><span class="pdf">{{ $t("register") }}</span></b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="justify-content-end">
          <locale-switcher />
          <client-only>
            <template v-if="$auth.$state.loggedIn">
              <b-nav-item-dropdown :text="$auth.user.name" right>
                <template slot="button-content"
                  ><b-img
                    :src="this.$auth.user.picture.data.url"
                    class="mt-1"
                    rounded="circle"
                    width="30px"
                    height="30px"
                /></template>
                <b-dropdown-item :to="localePath('/secure')">{{
                  $t("gossip")
                }}</b-dropdown-item>
                <b-dropdown-item v-show="loggedIn" :to="localePath('/logos')">{{
                  $t("impresa")
                }}</b-dropdown-item>
                <div class="dropdown-divider"></div>
                <b-dropdown-item @click="$auth.logout()">
                  <font-awesome-icon :icon="['fas', 'sign-out-alt']" />&nbsp;{{
                    $t("signOut")
                  }}
                </b-dropdown-item>
              </b-nav-item-dropdown>
            </template>
            <template v-else>
              <b-nav-item :to="localePath('/login')" right>
                <span
                  ><font-awesome-icon :icon="['fas', 'sign-in-alt']" />&nbsp;{{
                    $t("signIn")
                  }}</span
                >
              </b-nav-item>
            </template>
          </client-only>
        </b-navbar-nav>
      </b-collapse>
    </!-->
    <main role="main">
      <Nuxt />
    </main>
    <footer class="footer py-3" style="margin-top: auto!important;">
      <div class="container">
        <span class="text-muted">
          <div>Associazione APS “NESSUNO ESCLUSO”</div>

          <div>Piazza Largo del Popolo, 50</div>

          <div>66050 San Giovanni Lipioni (CH)</div>

          <p>nessunoesclusoaps@gmail.com</p>
        </span>
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

