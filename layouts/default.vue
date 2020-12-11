<template>
  <div class="d-flex flex-column h-100">
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand
        ><NuxtLink to="/"><Logo /></NuxtLink
      ></b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown text="Chi Siamo">
            <b-dropdown-item href="/blog/presentazione"
              >Presentazione</b-dropdown-item
            >
            <b-dropdown-item href="/blog/direttivo"
              >Consiglio&nbsp;Direttivo</b-dropdown-item
            >
            <b-dropdown-item
              href="/pdf/Atto Costitutivo e STATUTO.pdf"
              target="_blank"
              ><img
                style="width: 16px; height: auto"
                src="/svg/PDF_file_icon.svg"
              />&nbsp;Atto&nbsp;Costitutivo&nbsp;e&nbsp;Statuto&nbsp;&hellip;</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item href="/progetto">Il Progetto</b-nav-item>
          <b-nav-item-dropdown text="Media">
            <b-dropdown-item href="/gallery">Foto</b-dropdown-item>
            <b-dropdown-item href="/videos">Video</b-dropdown-item>
            <!-- b-dropdown-item href="/logos">Logo</!-->
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Contatti">
            <b-dropdown-item href="/contatti">Contatti</b-dropdown-item>
            <b-dropdown-item
              href="/pdf/DOMANDA DI AMMISSIONE A SOCIO.pdf"
              target="_blank"
              ><img
                style="width: 16px; height: auto"
                src="/svg/PDF_file_icon.svg"
              />&nbsp;Richiesta&nbsp;di&nbsp;Adesione&nbsp;&hellip;</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <main role="main" class="flex-shrink-0">
      <div class="container">
        <Nuxt />
      </div>
    </main>
    <footer class="footer mt-auto py-1">
      <div class="container">
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
  background: linear-gradient(to top, #f2f3f4, white 100%);
}

.footer #version {
  color: darkgray;
  font-family: monospace;
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

