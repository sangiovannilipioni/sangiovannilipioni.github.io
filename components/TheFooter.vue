<template>
  <footer class="footer py-1" style="margin-top: auto !important" v-if="$store.$isHomePage($route.path)">
    <div class="container-lg binome">
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
          <nuxt-link class="info" :to="localePath('/blog/intervista')">
            {{ $t("maiellaverde") }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </footer>
</template>
