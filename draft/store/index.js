export const state = () => ({
    counter: 0
  })
  
  export const mutations = {
    set(state, x) {
      state.counter = x;
    }
  }