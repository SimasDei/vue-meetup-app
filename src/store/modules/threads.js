import axios from 'axios';
import axiosInstance from '@/services/axios';

export default {
  namespaced: true,

  state: {
    items: [],
  },
  mutations: {
    FETCH_THREADS(state, threads) {
      state.items = threads;
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
      commit('CLEAR_ITEMS', 'items');
      axios
        .get(`/api/v1/threads?meetupId=${meetupId}`)
        .then(res => {
          const threads = res.data;
          commit('FETCH_THREADS', threads);
        })
        .catch(error => console.log(error));
    },
    postThread({ commit, state }, { title, meetupId }) {
      const thread = {};
      thread.title = title;
      thread.meetup = meetupId;

      return axiosInstance.post('/api/v1/threads', thread).then(res => {
        const createdThread = res.data;
        const index = state.items.length;
        commit('ADD_ITEM', { item: createdThread, index, resource: 'threads' }, { root: true });
        return createdThread;
      });
    },
  },
  getters: {
    threads(state) {
      return state.items;
    },
  },
};
