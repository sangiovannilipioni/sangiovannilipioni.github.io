export const state = () => ({
  nuxtTimestamp: undefined
})

export const getters = {
    getNuxtTimestamp: (state) => {
      return state.nuxtTimestamp
    }
}

export const actions = {
  nuxtServerInit({ commit }) {
    const now = new Date().getTime();
    commit("setNuxtTime", now)
  }
}

export const mutations = {
  setNuxtTime(state, payload) {
    state.nuxtTimestamp = payload
  }
}
