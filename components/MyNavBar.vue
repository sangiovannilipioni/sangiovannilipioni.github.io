<template>
  <client-only>
    <b-navbar toggleable="md" class="container" style="padding: 0 1rem">
      <b-navbar-brand :to="localePath('/')">
        <Logo :class="isHomePage?'home':'not-home'"/>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" style="text-align: center; border: 1px dotted gray; border-radius: 0.25rem;" is-nav>
        <b-navbar-nav toggleable="sm" style="flex: auto">
          <b-nav-item :to="localePath('/slides')">{{
            $t("presentation")
          }}</b-nav-item>


          <b-nav-item-dropdown>
            <template slot="button-content">{{ $t("patrimonio") }}</template>
            <b-dropdown-item  :to="localePath('/patrimonio')">{{
              $t("patrimonio")
            }}</b-dropdown-item>
            <b-dropdown-item  :to="localePath('/videos2')">{{
              $t("media")
            }}</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item  :to="localePath('/collab_da')">{{
              $t("collab_da") 
            }}</b-dropdown-item>
          </b-nav-item-dropdown>
          
          
          <b-nav-item :to="localePath('/maiellaverde')">{{
            $t("maiellaverde") 
          }}</b-nav-item>
          <b-nav-item id="spy" href="#" class="flex-grow-1 text-muted" disabled><span v-if="$auth.$state.loggedIn" >{{ $route.path }}</span></b-nav-item>

          <locale-switcher />

          <template v-if="$auth.$state.loggedIn">
            <b-nav-item-dropdown :text="$auth.user ? $auth.user.name : ''" right>
              <template slot="button-content"
                ><b-img
                  v-if="$auth.user"
                  :src="$auth.user.picture.data.url"
                  class="mt-1"
                  rounded="circle"
                  width="30px"
                  height="30px"
              /></template>
              <b-dropdown-item :to="localePath('/secure')">{{
                $t("gossip")
              }}</b-dropdown-item>
              <b-dropdown-item :to="localePath('/logos')">{{
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
              <span style="white-space: nowrap;"
                >{{
                  $t("signIn")
                }}<font-awesome-icon :icon="['fas', 'sign-in-alt']" style="margin-left: 0.5rem;" /></span
              >
            </b-nav-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </client-only>
</template>

<script>
export default {
  computed: {
    isHomePage() {
      return this.$route.path === '/' || this.$route.path === '/fr' || this.$route.path === '/en';
    }
  },
};
</script>



