<template>
  <div>
    <b-alert v-if="errorMessage" show variant="danger">
      {{ errorMessage }}
    </b-alert>
    <b-alert v-if="$auth.$state.redirect" show>
      You have to login before accessing to
      <strong>{{ $auth.$state.redirect }}</strong>
    </b-alert>
    <b-row align-h="center" class="pt-4">
      <b-card v-show="!loggedIn" title="Login" bg-variant="light">
        <div class="alert alert-info">
          <font-awesome-icon :icon="['fas', 'thumbs-up']" />
          Login with Facebook marche plus ou moins (plutôt plus que moins)
        </div>
        <div v-for="s in strategies" :key="s.key" class="mb-2">
          <b-btn
            block
            :style="{ background: s.color }"
            class="login-button"
            @click="$auth.loginWith(s.key)"
            :disabled="!s.active"
          >
            <font-awesome-icon class="float-left" :icon="['fab', s.key]" />
            Login with {{ s.name }}
          </b-btn>
        </div>
      </b-card>
      <b-card v-show="loggedIn" title="Logout" bg-variant="light">
        <b-btn
          block
          v-show="loggedIn"
          class="login-button"
          @click="$auth.logout()"
          ><font-awesome-icon :icon="['fas', 'sign-out-alt']" />
        </b-btn>
      </b-card>
    </b-row>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {},
  middleware: ["auth"],
  computed: {
    ...mapState("auth", ["loggedIn"]),
    strategies: () => [
      /* */
      { key: "google", name: "Google", color: "#4284f4", active: false },
      { key: "facebook", name: "Facebook", color: "#3c65c4", active: true },
      { key: "github", name: "GitHub", color: "#202326", active: false },
    ],
    errorMessage() {
      const { error } = this;
      if (!error || typeof error === "string") {
        return error;
      }
      let msg = "";
      if (error.message) {
        msg += error.message;
      }
      if (error.errors) {
        msg += `(${JSON.stringify(error.errors)
          .replace(/[{}"[\]]/g, "")
          .replace(/:/g, ": ")
          .replace(/,/g, " ")})`;
      }
      return msg;
    },
  },
  methods: {},
};
</script>

<style scoped>
.login-button {
  border: 0;
}
</style>