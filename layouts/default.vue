<!-- https://merrymaker.github.io/bs4-holygrail-layout/ -->
<template>
  <div class="d-flex flex-column vh-100">

    <TheNavBar2 />

    <main role="main" :class="isHomePage ? 'home' : 'not-home'">
      <Nuxt />
    </main>

    <footer class="footer py-1" style="margin-top: auto !important" v-if="isHomePage">
      <div class="container binome">
        <div class="text-muted border" style="flex: 1 0 0%">
          <div style="whitespace: nowrap">
            Associazione <b>Nessuno Escluso</b> APS<br />Largo del Popolo, 50<br />66050 San Giovanni Lipioni (CH)
          </div>
        </div>
        <div class="text-muted border" style="flex: 1 0 0%">
          <div>
            <a class="mail" href="mailto:nessunoesclusoaps@gmail.com"> nessunoesclusoaps@gmail.com </a>
          </div>
          <div>
            <nuxt-link class="pdf" to="/pdfs/Atto_Costitutivo_e_Statuto"> Atto Costitutivo e Statuto </nuxt-link>
          </div>
          <div>
            <a class="pdf" href="/pdf/Domanda_di_Ammissione_a_Socio.pdf" target="_blank">
              Domanda di Ammissione a Socio
              <font-awesome-icon :icon="['fas', 'external-link-alt']"
            /></a>
          </div>
          <div class="d-block d-xl-none">
            <a href="https://riabitaresangiovanni.maiellaverde.it/" target="_blank">
              {{ $t("maiellaverde") }}
              <font-awesome-icon :icon="['fas', 'external-link-alt']" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  computed: {
    isHomePage() {
      return this.$route.path === "/" || this.$route.path === "/fr" || this.$route.path === "/en"
    }
  }
}
</script>
