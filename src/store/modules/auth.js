import axios from 'axios';

export default {
  namespaced: true,

  state: {
    user: null,
    isAuthResolved: false,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_AUTH_STATE(state, value) {
      state.isAuthResolved = value;
    },
  },
  actions: {
    async register(payload) {
      try {
        return axios.post('/api/v1/users/register', payload);
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async login({ commit }, payload) {
      const res = await axios.post('/api/v1/users/login', payload);
      const user = res.data;
      commit('SET_USER', user);
    },
    async getAuthUser({ commit, getters }) {
      const user = getters['user'];
      if (user) return Promise.resolve(user);
      try {
        const res = await axios.get('/api/v1/users/me');
        const user = res.data;
        commit('SET_USER', user);
        commit('SET_AUTH_STATE', true);
        return user;
      } catch (error) {
        commit('SET_USER', null);
        commit('SET_AUTH_STATE', true);
        console.log(error);
        return error;
      }
    },
    async logout({ commit }) {
      try {
        await axios.post('/api/v1/users/logout');
        return commit('SET_USER', null);
      } catch (error) {
        console.log(error);
        return error;
      }
    },
  },
  getters: {
    user(state) {
      return state.user || null;
    },
    isAuthenticated(state) {
      return !!state.user;
    },
    isAuthResolved(state) {
      return state.isAuthResolved;
    },
  },
};
