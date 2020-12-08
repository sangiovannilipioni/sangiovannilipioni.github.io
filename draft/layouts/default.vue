<template>
  <div class="container d-flex flex-column h-100">
    <b-navbar toggleable="sm" type="light" variant="light">
      <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

      <b-navbar-brand
        ><NuxtLink to="/"><Logo /></NuxtLink
      ></b-navbar-brand>

      <b-collapse id="nav-text-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown text="Presentazione">
            <b-dropdown-item href="/blog/chi_siamo">Presentazione</b-dropdown-item>
            <b-dropdown-item href="/blog/direttivo">Consiglio Direttivo</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item href="/gallery">Media</b-nav-item>
          <b-nav-item-dropdown text="Documenti">
            <b-dropdown-item
              href="/pdf/Atto Costitutivo e STATUTO.pdf"
              target="_blank"
              >Atto Costitutivo e Statuto</b-dropdown-item
            >
            <b-dropdown-item
              href="/pdf/DOMANDA DI AMMISSIONE A SOCIO.pdf"
              target="_blank"
              >Come Adderire</b-dropdown-item
            >
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
</style>
