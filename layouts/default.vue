<template>
  <div class="container-fluid d-flex flex-column h-100">
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand
        ><NuxtLink to="/"><Logo /></NuxtLink
      ></b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown text="Media">
            <b-dropdown-item href="/gallery">Foto</b-dropdown-item>
            <b-dropdown-item href="/videos">Video</b-dropdown-item>
            <b-dropdown-item href="/logos">Logo</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Documenti">
            <b-dropdown-item disabled
              ><img src="/png/Adobe-PDF-Document-icon.png"
            /></b-dropdown-item>
            <b-dropdown-item
              href="/pdf/Atto Costitutivo e STATUTO.pdf"
              target="_blank"
              >Atto Costitutivo e Statuto&hellip;</b-dropdown-item
            >
            <b-dropdown-item
              href="/pdf/DOMANDA DI AMMISSIONE A SOCIO.pdf"
              target="_blank"
              >Come Aderire&hellip;</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Chi Siamo">
            <b-dropdown-item href="/blog/direttivo"
              >Consiglio Direttivo</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="container">
      <Nuxt />
    </div>
    <footer class="footer">
      <div class="float-right">
        <a target="_blank" :href="gitUrl">git</a>
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
  padding: 0 40px;

  font-family: monospace;
}
</style>

<script>
export default {
  data() {
    return {
      gitSha: process.env.NUXT_ENV_CURRENT_GIT_SHA,
      gitUrl: "https://github.com/sangiovannilipioni/sangiovannilipioni.github.io/commit/" + process.env.NUXT_ENV_CURRENT_GIT_SHA
    };
  },
};
</script>

