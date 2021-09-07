export const state = () => ({
  apiLastGitSha: undefined
})

export const getters = {
  apiLastGitSha: (state) => {
    return state.apiLastGitSha
  }
}

export const actions = {
  async nuxtServerInit({ commit, getters }, { $config }) {
    const doFetch = !$config.dev || $config.forceGraphqlQuery
    console.log("$config.dev", $config.dev, "$config.forceGraphqlQuery", $config.forceGraphqlQuery, "fetch api git sha ?", doFetch )
    if (doFetch) {
      await this.$axios({
        method: "post",
        url: $config.axios.githubGraphqlURL,
        auth: {
          username: $config.githubUsername,
          password: $config.githubToken
        },
        data: {
          query: `{
  repository(owner: "sangiovannilipioni", name: "sangiovannilipioni.api") {
    name
    defaultBranchRef {
      target {
        ... on Commit {
          history(first: 1) {
            nodes {
              message
              committedDate
              authoredDate
              oid
              author {
                email
                name
              }
            }
          }
        }
      }
    }
  }
}`
        }
      })
        .then(function (response) {
          if (
            response &&
            response.data &&
            response.data.data &&
            response.data.data.repository &&
            response.data.data.repository.defaultBranchRef &&
            response.data.data.repository.defaultBranchRef.target &&
            response.data.data.repository.defaultBranchRef.target.history &&
            response.data.data.repository.defaultBranchRef.target.history.nodes &&
            response.data.data.repository.defaultBranchRef.target.history.nodes.length &&
            response.data.data.repository.defaultBranchRef.target.history.nodes[0] &&
            response.data.data.repository.defaultBranchRef.target.history.nodes[0].oid
          ) {
            commit("setApiLastGitSha", {
              apiLastGitSha: response.data.data.repository.defaultBranchRef.target.history.nodes[0].oid
            })
            console.log(
              "feched last git sha of sangiovannilipioni.api from",
              $config.axios.githubGraphqlURL,
              ":",
              getters.apiLastGitSha
            )
          }
        })
        .catch(function (error) {
          console.error("axios error", $config.axios.githubGraphqlURL, error)
        })
    }
  }
}

export const mutations = {
  setApiLastGitSha(state, payload) {
    state.apiLastGitSha = payload.apiLastGitSha
  }
}
