import axios from 'axios';

export default {
  namespaced: true,

  state: {
    items: [],
  },
  mutations: {
    FETCH_THREADS(state, threads) {
      state.threads = threads;
    },
    CLEAR_ITEMS(state, itemType) {
      if (itemType === 'meetup') {
        state[itemType] = {};
      }
      state[itemType] = [];
    },
  },
  actions: {
    fetchThreads({ commit }, meetupId) {
      commit('CLEAR_ITEMS', 'threads');
      axios
        .get(`/api/v1/threads?meetupId=${meetupId}`)
        .then(res => {
          const threads = res.data;
          commit('FETCH_THREADS', threads);
        })
        .catch(error => console.log(error));
    },
  },
  getters: {},
};
