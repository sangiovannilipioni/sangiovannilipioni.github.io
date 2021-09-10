<template>
  <div id="backButton" class="container-lg" @click="backOnEscape">
    <div v-if="$auth.$state.redirect" role="alert" class="alert alert-info">
      You have to login before accessing to
      <strong>{{ $auth.$state.redirect }}</strong>
    </div>

    <div class="row pt-4 justify-content-center">
      <div v-show="!loggedIn" class="card bg-light" style="max-width: fit-content; margin-bottom: 0.75rem; display: ">
        <div class="card-body">
          <h4 class="card-title">Login</h4>
          <div v-for="s in strategies" :key="s.key" class="mb-2" style="width: 100%">
            <button
              type="button"
              class="btn login-button btn-secondary"
              :style="{ background: s.color }"
              :disabled="!s.active || loading"
              @click="loading = true && $auth.loginWith(s.key)"
            >
              <span v-if="s.faIcon" style="margin-right: 0.5rem">
                <font-awesome-icon :icon="['fab', s.faIcon]" />
              </span>
              {{ s.name }}
              <font-awesome-icon v-if="!loading" :icon="['fas', 'sign-out-alt']" style="margin-left: 0.75rem" />
              <font-awesome-icon
                v-if="loading"
                :icon="['fas', 'spinner']"
                class="fa-spin"
                style="margin-left: 0.75rem"
              />
            </button>
          </div>
        </div>
      </div>

      <div v-show="loggedIn" class="card bg-light" style="max-width: fit-content; margin-bottom: 0.75rem">
        <div class="card-body">
          <h4 class="card-title">Logout</h4>
          <button
            class="btn login-button btn-primary"
            :disabled="loading"
            variant="primary"
            @click="loading = true && $auth.logout()"
          >
            <font-awesome-icon v-if="!loading" :icon="['fas', 'sign-out-alt']" />
            <font-awesome-icon v-if="loading" :icon="['fas', 'spinner']" class="fa-spin" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  data() {
    return {
      loading: false
    }
  },
  layout: "logo",
  computed: {
    ...mapState("auth", ["loggedIn"]),
    strategies: () => [
      {
        key: "facebook",
        name: "Facebook",
        color: "#3c65c4",
        active: true,
        faIcon: "facebook"
      }
    ]
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.backOnEscape)
  },
  mounted() {
    this.loading = false
    window.addEventListener("keydown", this.backOnEscape)
  },
  methods: {
    backOnEscape(e) {
      if ((e.srcElement && e.srcElement.id === "backButton") || e.key === "Escape") {
        window.removeEventListener("keydown", this.backOnEscape)
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
</style>
