<template>
  <div class="container-fluid d-flex flex-column h-100">
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
              >Il&nbsp;C.D.A.</b-dropdown-item
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
    <div class="container">
      <Nuxt />
    </div>
    <footer class="footer">
      <div>
        Associazione APS “NESSUNO ESCLUSO”
        <a class="float-right" target="_blank" :href="gitUrl"
          >version {{ packageVersion }}</a
        >
      </div>
    </footer>
  </div>
</template>

<style scoped>
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: transparent;
  color: darkgray;
  padding-right: 40px;
}
.footer a {
  font-family: monospace;
}
</style>

<script>
export default {
  data() {
    return {
      packageVersion: process.env.packageVersion,
      gitSha: process.env.NUXT_ENV_CURRENT_GIT_SHA,
      gitUrl:
        "https://github.com/sangiovannilipioni/sangiovannilipioni.github.io/commit/" +
        process.env.NUXT_ENV_CURRENT_GIT_SHA,
    };
  },
};
</script>

