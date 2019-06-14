import axios from 'axios';

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
    register(payload) {
      return axios.post('/api/v1/users/register', payload);
    },
    login({ commit }, payload) {
      return axios.post('/api/v1/users/login', payload).then(res => {
        const user = res.data;
        commit('SET_USER', user);
      });
    },
  },
  getters: {
    user(state) {
      return state.user || null;
    },
    isAuthenticated(state) {
      return !!state.user;
    },
  },
};
