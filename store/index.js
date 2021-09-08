export const state = () => ({})

export const getters = {}

export const actions = {
  async nuxtServerInit({ commit, getters }, { $config }) {
    const props = [
      "dev",
      "generationTimestamp",
      "gitDirty",
      "githubUsername",
      "gitSha",
      "gitShaAPI",
      "packageVersion"
      /* NEVER! "githubToken", EVER! */
    ]
    props.forEach((p) => {
      console.log(p, $config[p])
    })
  }
}

export const mutations = {}
