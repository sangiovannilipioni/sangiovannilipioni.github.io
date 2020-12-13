<template>
  <div class="d-flex flex-column h-100">
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand
        ><NuxtLink to="/"><Logo /></NuxtLink
      ></b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav class="mr-auto">
          <b-nav-item-dropdown text="Chi Siamo">
            <b-dropdown-item href="/blog/presentazione"
              >Presentazione</b-dropdown-item
            >
            <b-dropdown-item href="/blog/direttivo"
              >Consiglio&nbsp;Direttivo</b-dropdown-item
            >
            <b-dropdown-item href="/embedded_pdf/Atto_Costitutivo_e_Statuto"
              ><span class="pdf"
                >Atto&nbsp;Costitutivo&nbsp;e&nbsp;Statuto</span
              ></b-dropdown-item
            >
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Il Progetto">
            <b-dropdown-item
              href="/embedded_pdf/Programma_x_San_Giovanni_Finale_Giugno_2020_pptx"
              ><span class="pdf"
                >Programma x San_Giovanni Finale Giugno 2020</span
              ></b-dropdown-item
            >
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Media">
            <b-dropdown-item href="/gallery">Foto</b-dropdown-item>
            <b-dropdown-item href="/videos2">Video</b-dropdown-item>
            <b-dropdown-item href="/logos">Logo</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="Contatti">
            <b-dropdown-item href="/contatti">Contatti</b-dropdown-item>
            <b-dropdown-item
              href="/pdf/Domanda_di_Ammissione_a_Socio.pdf"
              target="_blank"
              ><span class="pdf"
                >Richiesta&nbsp;di&nbsp;Adesione&nbsp;&hellip;</span
              ></b-dropdown-item
            >
          </b-nav-item-dropdown>

        </b-navbar-nav>
        <b-navbar-nav class="justify-content-end">
          <template v-if="$auth.$state.loggedIn">$auth.user.name</template>
          <template v-else>
            <a
              class="nav-item nav-link justify-content-end"
              href="/login"
              title="login"
            >
              <span
                ><font-awesome-icon
                  :icon="['fas', 'sign-in-alt']"
                />&nbsp;Entra</span
              >
            </a>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <main role="main" class="flex-shrink-0">
      <div class="container">
        <Nuxt />
      </div>
    </main>
    <footer class="footer mt-auto py-1">
      <div class="container-fluid">
        <span>&copysr;&nbsp;Associazione APS “<i>NESSUNO ESCLUSO</i>”</span>
        <a id="version" class="float-right" target="_blank" :href="gitUrl"
          >version {{ packageVersion }}</a
        >
      </div>
    </footer>
  </div>
</template>

<style scoped>
nav {
  background: linear-gradient(to bottom, white, #f2f3f4 100%);
}

.footer {
  color: darkgray;
  background: linear-gradient(to top, #f2f3f4, white 100%);
}

.footer #version {
  color: darkgray;
  font-family: monospace;
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
export default {
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

