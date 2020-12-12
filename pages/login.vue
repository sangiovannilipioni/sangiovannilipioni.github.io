<template>
  <div>
    <h2 class="text-center">Login</h2>
    <hr />
    <b-alert v-if="errorMessage" show variant="danger">
      {{ errorMessage }}
    </b-alert>
    <b-alert v-if="$auth.$state.redirect" show>
      You have to login before accessing to
      <strong>{{ $auth.$state.redirect }}</strong>
    </b-alert>
    <b-row align-h="center" class="pt-4">
        <b-card title="Social Login" bg-variant="light">
          <div class="alert alert-warning">Work in Progress, rien ne marche pour l'instant !</div>
          <div v-for="s in strategies" :key="s.key" class="mb-2">
            <b-btn
              block
              :style="{ background: s.color }"
              class="login-button"
              @click="$auth.loginWith(s.key)"
            >
              Login with {{ s.name }}
            </b-btn>
          </div>
        </b-card>
    </b-row>
  </div>
</template>

<script>
// import busyOverlay from '~/components/busy-overlay'

export default {
  components: { /* busyOverlay */ },
  middleware: ['auth'],
  data() {
    return {
      username: '',
      password: '123',
      error: null
    }
  },
  computed: {
    strategies: () => [ 
    /* */
      { key: 'google', name: 'Google', color: '#4284f4' },
      { key: 'facebook', name: 'Facebook', color: '#3c65c4' },
      { key: 'github', name: 'GitHub', color: '#202326' }
   ],
    redirect() {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      )
    },
    isCallback() {
      return Boolean(this.$route.query.callback)
    },
    errorMessage() {
      const { error } = this
      if (!error || typeof error === 'string') {
        return error
      }
      let msg = ''
      if (error.message) {
        msg += error.message
      }
      if (error.errors) {
        msg += `(${JSON.stringify(error.errors)
          .replace(/[{}"[\]]/g, '')
          .replace(/:/g, ': ')
          .replace(/,/g, ' ')})`
      }
      return msg
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.login-button {
  border: 0;
}
</style>