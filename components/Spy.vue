<template>
  <div v-if="forceShow || devMode || ($auth.user && $auth.user.email === 'christophe.thiebaud@alumni.insead.edu')">
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
        {{ axiosBaseURL }}
      </a>
      <a v-if="gitShaAPI" class="dropdown-item" :href="gitUrlAPI" target="_github_api">
        <font-awesome-icon :icon="['fas', 'database']" style="visibility: hidden" />
        <span>{{ abbrev(gitShaAPI) }}</span>
      </a>
      <div v-else class="dropdown-item">
        <font-awesome-icon :icon="['fas', 'database']" style="visibility: hidden" />
        <span>{{ abbrev(gitShaAPI) }}</span>
      </div>
      <div class="dropdown-item">
        <font-awesome-icon :icon="['fas', 'server']" style="" />
        <span>{{ generationTimestampAsString }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ellipsed {
  max-width: 300px;
  font-size: smaller;
  background-color: #f7f7f7;

  * {
    padding: 0;
    font-family: $fontFamilyMonospace, monospace;
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
export default {
  data() {
    return {
      axiosBaseURL: this.$config.axios.baseURL,
      devMode: this.$config.dev,
      gitDirty: this.$config.gitDirty,
      gitSha: this.$config.gitSha,
      gitShaAPI: this.$config.gitShaAPI,
      gitUrl: `https://github.com/sangiovannilipioni/sangiovannilipioni.github.io/commit/${this.$config.gitSha}`,
      gitUrlAPI: `https://github.com/sangiovannilipioni/sangiovannilipioni.api/commit/${this.$config.gitShaAPI}`,
      version: this.$config.packageVersion,
    }
  },
  methods: {
    abbrev(str) {
      return str ? str.slice(0, 7) : "undefined"
    }
  },
  computed: {
    generationTimestampAsString() {
      const date = new Date(this.$config.generationTimestamp * 1000)
      const fornatted = date.toString()
      return fornatted
    }
  },
  props: {
    forceShow: {
      default: false,
      type: Boolean,
      required: false
    }
  }
}
</script>
