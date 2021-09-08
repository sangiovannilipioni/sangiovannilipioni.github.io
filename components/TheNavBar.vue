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
              <nuxt-link :to="localePath('/slides')" class="nav-link">{{ $t("presentation") }} </nuxt-link>
            </li>

            <!-- patrimonio -->
            <li class="nav-item">
              <nuxt-link :to="localePath('/patrimonio')" class="nav-link">{{ $t("patrimonio") }}</nuxt-link>
            </li>

            <!-- maiellaverde -->
            <!-- d-xl-block: hide on screens smaller than xl https://getbootstrap.com/docs/5.1/utilities/display/ -->
            <li class="nav-item d-none d-xl-block">
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

            <li class="nav-item">
              <nuxt-link :to="localePath('/credits')" class="nav-link">
                <img src="/svg/OOjs_UI_icon_info.svg" />
              </nuxt-link>
            </li>

            <!-- area riservata -->
            <li v-if="devMode || $auth.$state.loggedIn" class="nav-item dropdown">
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
                <div v-if="devMode || ($auth.user && $auth.user.email === 'christophe.thiebaud@alumni.insead.edu')">
                  <div class="dropdown-divider"></div>
                  <div class="ellipsed card card-body m-2 p-1">
                    <div v-if="devMode" class="dropdown-item">
                      <font-awesome-icon :icon="['fas', 'code']" style="" />
                      <span>Development</span>
                    </div>
                    <div v-else class="dropdown-item">
                      <font-awesome-icon :icon="['fas', 'industry']" style="" />
                      <span>Production</span>
                    </div>
                    <div class="dropdown-item">
                      <font-awesome-icon :icon="['fas', 'marker']" style="" />
                      <span>{{ version }}</span>
                    </div>
                    <a class="dropdown-item" :href="gitUrl" target="_github">
                      <font-awesome-icon :icon="['fab', 'github']" style="" />
                      <span>{{ abbrev(gitSha) }}</span>
                      <span class="text-muted">{{ gitDirty }}</span>
                    </a>
                    <a class="dropdown-item" :href="`${axiosBaseURL}/units.json`" target="_api">
                      <font-awesome-icon :icon="['fas', 'database']" style="" />
                      <!-- font-awesome-icon :icon="['fas', 'external-link-alt']" style="" / -->
                      {{ axiosBaseURL }}
                    </a>
                    <a v-if="apiLastGitSha" class="dropdown-item" :href="gitUrlAPI" target="_github_api">
                      <font-awesome-icon :icon="['fas', 'database']" style="visibility: hidden" />
                      <span>{{ abbrev(apiLastGitSha) }}</span>
                    </a>
                    <div v-else class="dropdown-item">
                      <font-awesome-icon :icon="['fas', 'database']" style="visibility: hidden" />
                      <span>{{ abbrev(apiLastGitSha) }}</span>
                    </div>
                    <div class="dropdown-item">
                      <font-awesome-icon :icon="['fas', 'server']" style="" />
                      <span>{{ generationTimestampAsString }}</span>
                    </div>
                  </div>
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

<style lang="scss" scoped>
.ellipsed {
  max-width: 280px;
  font-size: smaller;
  background-color: #f7f7f7;

  * {
    padding: 0;
    font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
  > div > span {
    color: #6c757d !important;
  }
}
</style>

<script>
import { mapGetters } from "vuex"
export default {
  data() {
    return {
      devMode: this.$config.dev,
      version: this.$config.packageVersion,
      axiosBaseURL: this.$config.axios.baseURL,
      gitSha: this.$config.gitSha,
      gitDirty: this.$config.gitDirty,
      gitUrl: `https://github.com/sangiovannilipioni/sangiovannilipioni.github.io/commit/${this.$config.gitSha}`
    }
  },
  methods: {
    abbrev(str) {
      return str ? str.slice(0, 7) : "undefined"
    }
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters(["apiLastGitSha"]),
    gitUrlAPI() {
      return `https://github.com/sangiovannilipioni/sangiovannilipioni.api/commit/${this.apiLastGitSha}`
    },
    generationTimestampAsString() {
      const date = new Date(this.$config.generationTimestamp * 1000)
      const fornatted = date.toString()
      return fornatted
    }
  }
}
</script>
