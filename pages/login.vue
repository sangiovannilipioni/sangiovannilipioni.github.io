<template>
  <div id="backButton" class="container" @click="backOnEscape">
    <!-- b-alert v-if="errorMessage" show variant="danger">
      {{ errorMessage }}
    </!-->
    <b-alert v-if="$auth.$state.redirect" show>
      You have to login before accessing to
      <strong>{{ $auth.$state.redirect }}</strong>
    </b-alert>
    <b-row align-h="center" class="pt-4">
      <b-card v-show="!loggedIn" title="Login" bg-variant="light" style="max-width: fit-content;">
        <div v-for="s in strategies" :key="s.key" class="mb-2">
          <b-btn
            :style="{ background: s.color }"
            class="login-button"
            :disabled="!s.active || loading"
            @click="loading=true && $auth.loginWith(s.key)">
            {{ s.name }}
            <font-awesome-icon v-if="!loading" :icon="['fas', 'sign-out-alt']" style="margin-left: 0.75rem" />
            <font-awesome-icon v-if="loading" :icon="['fas', 'spinner']" class="fa-spin"  style="margin-left: 0.75rem" />
          </b-btn>
        </div>
      </b-card>
      <b-card v-show="loggedIn" title="Logout" bg-variant="light" style="max-width: fit-content;">
        <b-btn
          v-show="loggedIn"
          class="login-button"
          :disabled="loading"
          @click="loading=true && $auth.logout()"
        >
          <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
        </b-btn>
      </b-card>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      loading: false,
    }
  },
  components: {
  },
  layout: 'logo',
  middleware: ['auth'],
  computed: {
    ...mapState('auth', ['loggedIn']),
    strategies: () => [
      { key: 'facebook', name: 'Facebook', color: '#3c65c4', active: true }
    ]
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.backOnEscape)
  },
  mounted () {
    this.loading = false;
    window.addEventListener('keydown', this.backOnEscape)
  },
  methods: {
    backOnEscape (e) {
      if ((e.srcElement && e.srcElement.id === 'backButton') || e.key === 'Escape') {
        window.removeEventListener('keydown', this.backOnEscape)
        this.$router.back()
      }
    }
  }
}
</script>

<style scoped>
.login-button {
  border: 0;
}
body {
  background-color:red;
}
</style>
