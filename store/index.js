export const state = () => ({
  serverTimestamp: undefined,
  apiLastGitSha: undefined
})

export const getters = {
  serverTimestamp: (state) => {
    return state.serverTimestamp
  },
  apiLastGitSha: (state) => {
    return state.apiLastGitSha
  }
}

export const actions = {
  async nuxtServerInit({ commit, dispatch, getters }) {
    console.log("@nuxtServerInit, serverTimestamp getter IS", getters.serverTimestamp)
    if (typeof getters.serverTimestamp === "undefined") {
      const now = new Date().getTime()
      console.log("SERVER TIMESTAMP", new Date(now).toUTCString())
      commit("setServerTimestamp", now)
    }
    console.log("@nuxtServerInit, apiLastGitSha getter IS", getters.apiLastGitSha)
    if (typeof getters.apiLastGitSha === "undefined") {
      await dispatch("fetchAndStoreApiLastGitSha")
    }
  },

  // axios...
  async fetchAndStoreApiLastGitSha({ commit, getters }) {
    console.log("API LAST GIT SHA STARTING...", getters.apiLastGitSha)
    if (typeof getters.apiLastGitSha !== "undefined") {
        console.log("API LAST GIT SHA ALREADY FETCHED !")
    } else {
      await this.$axios({
        method: "post",
        url: "https://api.github.com/graphql",
        auth: {
          username: "cthiebaud",
          password: process.env.SGL_API_GITHUB_TOKEN
        },
        data: {
        query: `
{
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
}
        `}
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
            console.log(
              "API LAST GIT SHA RETURNED",
              response.data
            )
            commit("setApiLastGitSha", {
              apiLastGitSha: response.data.data.repository.defaultBranchRef.target.history.nodes[0].oid
            })
          }
        })
        .catch(function (error) {
          console.log("API LAST GIT SHA ERROR!", error)
        })
    }
  }
}

export const mutations = {
  setServerTimestamp(state, payload) {
    state.serverTimestamp = payload
  },
  setApiLastGitSha(state, payload) {
    console.log("setApiLastGitSha RECEIVED", payload, "existing", state.apiLastGitSha)
    if (typeof state.apiLastGitSha === "undefined") {
      state.apiLastGitSha = payload.apiLastGitSha
    }
  }
}
