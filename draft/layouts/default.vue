<template>
  <div class="container d-flex flex-column h-100">
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand
        ><NuxtLink to="/"><Logo /></NuxtLink
      ></b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown text="Media">
            <b-dropdown-item  href="/gallery">Fotos</b-dropdown-item>
            <b-dropdown-item href="/videos">Videos</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Documenti">
            <b-dropdown-item disabled><img src="/png/Adobe-PDF-Document-icon.png"/></b-dropdown-item>
            <b-dropdown-item
              href="/pdf/Atto Costitutivo e STATUTO.pdf"
              target="_blank"
              >Atto Costitutivo e Statuto&hellip;</b-dropdown-item
            >
            <b-dropdown-item
              href="/pdf/DOMANDA DI AMMISSIONE A SOCIO.pdf"
              target="_blank"
              >Come Adderire&hellip;</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Chi Siamo">
            <b-dropdown-item href="/blog/direttivo">Consiglio Direttivo</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Nuxt />
  </div>
</template>

<style scoped>
.NuxtLogo {
  width: 48px;
  height: auto;
}
ul.dropdown-menu li a {
white-space: nowrap;
}
</style>
