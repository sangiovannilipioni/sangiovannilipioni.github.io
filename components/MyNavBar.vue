<template>
  <client-only>
    <b-navbar toggleable="md" class="container" style="padding: 0 1rem">
      <b-navbar-brand :to="localePath('/')">
        <Logo />
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav toggleable="sm" style="flex: auto">
          <b-nav-item :to="localePath('/slides')">{{
            $t("theProject")
          }}</b-nav-item>
          <b-nav-item class="flex-grow-1" href="#"
            >Riabitare San Giovanni</b-nav-item
          >
          <b-nav-item href="#">{{ $route.path }}</b-nav-item>
          <locale-switcher />
          <template v-if="$auth.$state.loggedIn">
            <b-nav-item-dropdown :text="$auth.user.name" right>
              <template slot="button-content"
                ><b-img
                  :src="this.$auth.user.picture.data.url"
                  class="mt-1"
                  rounded="circle"
                  width="30px"
                  height="30px"
              /></template>
              <b-dropdown-item :to="localePath('/secure')">{{
                $t("gossip")
              }}</b-dropdown-item>
              <b-dropdown-item v-show="loggedIn" :to="localePath('/logos')">{{
                $t("impresa")
              }}</b-dropdown-item>
              <div class="dropdown-divider"></div>
              <b-dropdown-item @click="$auth.logout()">
                <font-awesome-icon :icon="['fas', 'sign-out-alt']" />&nbsp;{{
                  $t("signOut")
                }}
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </template>
          <template v-else>
            <b-nav-item :to="localePath('/login')" right>
              <span
                ><font-awesome-icon :icon="['fas', 'sign-in-alt']" />&nbsp;{{
                  $t("signIn")
                }}</span
              >
            </b-nav-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </client-only>
</template>

