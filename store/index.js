export const state = () => ({})

export const getters = {}

export const actions = {
  async nuxtServerInit({ commit, getters }, { $config }) {
    const props = [
      "apiGitSha",
      "dev",
      "generationTimestamp",
      "gitDirty",
      /* "githubToken", NEVER! */
      "githubUsername",
      "gitSha",
      "packageVersion"
    ]
    props.forEach((p) => {
      console.log(p, $config[p])
    })
  }
}

export const mutations = {}
