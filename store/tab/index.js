export const state = () => ({
  tab: 0,
  tab2: 0,
  breadcrumbs: false
})

export const getters = {
  getTab: (state) => {
    return state.tab
  },
  getTab2: (state) => {
    return state.tab2
  },
  getBreadcrumbs: (state) => {
    return state.breadcrumbs
  }
}

export const mutations = {
  setTab(state, payload) {
    state.tab = payload.tab
  },
  setTab2(state, payload) {
    state.tab2 = payload.tab2
  },
  setBreadcrumbs(state, payload) {
    state.breadcrumbs = payload.breadcrumbs
  }
}
