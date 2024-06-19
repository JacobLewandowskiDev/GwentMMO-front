import { createStore } from 'vuex';

export default createStore({
  state: {
    playerCreated: false,
  },
  mutations: {
    setPlayerCreated(state, status) {
      state.playerCreated = status;
    },
  },
  actions: {
    createUser({ commit }) {
      commit('setPlayerCreated', true);
    },
  },
  getters: {
    isPlayerCreated: (state) => state.playerCreated,
  },
});