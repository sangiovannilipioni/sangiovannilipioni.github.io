export const state = () => ({
  tab: 0
});

export const getters = {
  getTab: state => {
    return state.tab;
  }
};

export const mutations = {
  setTab(state, payload) {
      state.tab = payload.tab;
  }
};

