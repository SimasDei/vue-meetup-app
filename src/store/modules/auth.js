// import axios from 'axios';

export default {
  namespaced: true,

  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    register({ commit }, payload) {
      commit('SET_USER', payload);
      console.log(payload);
    },
    login({ commit }, payload) {
      commit('SET_USER', payload);
      console.log(payload);
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};
