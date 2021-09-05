<template>
  <client-only>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-lg">
        <nuxt-link :to="localePath('/')" class="navbar-brand">
          <LogoDiv :class="$store.$isHomePage($route.path) ? 'home' : 'not-home'" />
        </nuxt-link>
        <button
          class="navbar-toggler"
          id="navbarToggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav me-auto mb-0 mb-lg-0" style="flex: auto">
            <!-- presentation -->
            <li class="nav-item">
              <nuxt-link :to="localePath('/slides')" class="nav-link">{{ $t("presentation") }}</nuxt-link>
            </li>

            <!-- patrimonio -->
            <li class="nav-item">
              <nuxt-link :to="localePath('/patrimonio')" class="nav-link">{{ $t("patrimonio") }}</nuxt-link>
            </li>

            <!-- maiellaverde -->
            <li class="nav-item d-none d-xl-block">
              <!-- hide on screens smaller than lg https://getbootstrap.com/docs/4.6/utilities/display/ -->
              <nuxt-link
                :to="localePath('/blog/intervista')"
                target="_self"
                class="nav-link"
                style="white-space: nowrap"
                >{{ $t("maiellaverde") }}</nuxt-link
              >
            </li>

            <!-- spy -->
            <li id="spy" class="nav-item flex-grow-1 text-muted" disabled>
              <a href="#" target="_self" tabindex="-1" aria-disabled="true" class="nav-link disabled">
                <span v-if="$auth.$state.loggedIn">{{ $route.path }}</span>
              </a>
            </li>

            <LocaleSwitcherNavItemDropdown />

            <!-- area riservata -->
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
                  v-if="$auth.user && $auth.user.picture && $auth.user.picture.data && $auth.user.picture.data.url"
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
                <div v-if="$auth.user && $auth.user.email === 'christophe.thiebaud@alumni.insead.edu'">
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" :href="gitUrl" target="_github">
                    <font-awesome-icon :icon="['fab', 'github']" style="width: 24px; height: 24px" />
                  </a>
                </div>
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
      </div>
    </nav>
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      gitUrl: `https://github.com/sangiovannilipioni/sangiovannilipioni.github.io/commit/${process.env.NUXT_ENV_CURRENT_GIT_SHA}`
    }
  }
}
</script>
