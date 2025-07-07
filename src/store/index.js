import { createStore } from 'vuex';

export default createStore({
  state: {
    playerData: null,
    socket: null,
  },
  mutations: {
    setPlayerData(state, data) {
      state.playerData = data;
    },
    setSocket(state, socket) {
      state.socket = socket;
    },
  },
  actions: {
    updatePlayerData({ commit }, data) {
      commit('setPlayerData', data);
    },
    updateSocket({ commit }, socket) {
      commit('setSocket', socket);
    },
  },
  getters: {
    getPlayerData(state) {
      return state.playerData;
    },
    getSocket(state) {
      return state.socket;
    },
  },
});