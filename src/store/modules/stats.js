import axios from '@/services/axios';

export default {
  namespaced: true,
  state: {
    meetups: {
      data: [],
      count: null,
    },
    threads: {
      data: [],
      count: null,
    },
    posts: {
      data: [],
      count: null,
    },
  },
  mutations: {
    SET_STATS(state, stats) {
      return Object.assign(state, {}, stats);
    },
  },
  actions: {
    fetchUserStats({ commit }) {
      return axios
        .get('/api/v1/users/me/activity')
        .then(res => {
          const stats = res.data;
          commit('SET_STATS', stats);
        })
        .catch(error => console.log(error));
    },
  },
  getters: {
    meetups(state) {
      return state.meetups;
    },
    threads(state) {
      return state.threads;
    },
    posts(state) {
      return state.posts;
    },
  },
};
