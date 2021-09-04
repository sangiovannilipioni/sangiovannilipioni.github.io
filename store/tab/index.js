export const state = () => ({
  tab: 0,
  tab2: 0
})

export const getters = {
  getTab: (state) => {
    return state.tab
  },
  getTab2: (state) => {
    return state.tab2
  }
}

export const mutations = {
  setTab(state, payload) {
    state.tab = payload.tab
  },
  setTab2(state, payload) {
    state.tab2 = payload.tab2
  }
}
