import { createStore } from 'vuex';

export default createStore({
  state: {
    playerData: null,
  },
  mutations: {
    setPlayerData(state, data) {
      state.playerData = data;
    },
  },
  actions: {
    updatePlayerData({ commit }, data) {
      commit('setPlayerData', data);
    },
  },
  getters: {
    getPlayerData(state) {
      return state.playerData;
    },
  },
});