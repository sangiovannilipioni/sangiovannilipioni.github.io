<template>
  <client-only>
    <nav class="navbar container-lg navbar-light navbar-expand-lg">
      <nuxt-link :to="localePath('/')" target="_self" class="navbar-brand">
        <LogoDiv :class="isHomePage ? 'home' : 'not-home'" />
      </nuxt-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarSupportedContent"
        data-bs-toggle="collapse"
        data-bs-target=".navbar-collapse"
        style="text-align: center; z-index: 3"
      >
        <ul toggleable="sm" class="navbar-nav" style="flex: auto">
          <li class="nav-item">
            <nuxt-link :to="localePath('/slides')" target="_self" class="nav-link" aria-current="page">{{
              $t("presentation")
            }}</nuxt-link>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ $t("patrimonio") }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <nuxt-link :to="localePath('/patrimonio')" role="menuitem" target="_self" class="dropdown-item">{{
                  $t("patrimonio")
                }}</nuxt-link>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <nuxt-link :to="localePath('/collab_da')" role="menuitem" target="_self" class="dropdown-item">{{
                  $t("collab_da")
                }}</nuxt-link>
              </li>
            </ul>
          </li>

          <li class="nav-item d-none d-xl-block">
            <!-- hide on screens smaller than lg https://getbootstrap.com/docs/4.6/utilities/display/ -->
            <nuxt-link :to="localePath('/maiellaverde')" target="_self" class="nav-link" style="white-space: nowrap">{{
              $t("maiellaverde")
            }}</nuxt-link>
          </li>

          <li id="spy" class="nav-item flex-grow-1 text-muted" disabled>
            <a href="#" target="_self" tabindex="-1" aria-disabled="true" class="nav-link disabled">
              <span v-if="$auth.$state.loggedIn">{{ $route.path }}</span>
            </a>
          </li>

          <LocaleSwitcherNavItemDropdown />

          <li v-if="$auth.$state.loggedIn" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                v-if="$auth.user"
                :src="$auth.user.picture.data.url"
                class="mt-1"
                rounded="circle"
                width="30px"
                height="30px"
              />
              <font-awesome-icon v-else :icon="['fas', 'user']" />
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <nuxt-link class="dropdown-item" :to="localePath('/secure')">{{ $t("gossip") }}</nuxt-link>
              <nuxt-link class="dropdown-item" :to="localePath('/from_the_ground')">{{
                $t("from_the_ground")
              }}</nuxt-link>
              <nuxt-link class="dropdown-item" :to="localePath('/from_the_sky')">{{ $t("from_the_sky") }}</nuxt-link>
              <nuxt-link class="dropdown-item" :to="localePath('/logos')">{{ $t("impresa") }}</nuxt-link>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" @click="$auth.logout()">
                <font-awesome-icon :icon="['fas', 'sign-out-alt']" />&nbsp;{{ $t("signOut") }}
              </a>
            </div>
          </li>
          <li v-else right="" class="nav-item">
            <nuxt-link :to="localePath('/login')" target="_self" class="nav-link">
              <span style="white-space: nowrap" class="nav-item">
                {{ $t("signIn") }}
              </span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </nav>
  </client-only>
</template>

<script>
export default {
  computed: {
    isHomePage() {
      return this.$route.path === "/" || this.$route.path === "/fr" || this.$route.path === "/en"
    }
  }
}
</script>
