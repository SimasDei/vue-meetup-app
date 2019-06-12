import axios from 'axios';

export default {
  namespaced: true,

  state: {
    items: [],
    item: {},
  },
  mutations: {
    FETCH_MEETUPS(state, meetups) {
      state.meetups = meetups;
    },
    FETCH_MEETUP(state, meetup) {
      state.meetup = meetup;
    },
    CLEAR_ITEMS(state, itemType) {
      if (itemType === 'item') {
        state[itemType] = {};
      }
      state[itemType] = [];
    },
  },
  actions: {
    fetchMeetups({ commit }) {
      commit('CLEAR_ITEMS', 'meetups');
      axios
        .get('/api/v1/meetups')
        .then(res => {
          const meetups = res.data;
          commit('FETCH_MEETUPS', meetups);
        })
        .catch(error => console.log(error));
    },
    fetchMeetup({ commit }, meetupId) {
      commit('CLEAR_ITEMS', 'meetup');
      commit('CLEAR_ITEMS', 'threads');
      axios
        .get(`/api/v1/meetups/${meetupId}`)
        .then(res => {
          const meetup = res.data;
          commit('FETCH_MEETUP', meetup);
        })
        .catch(error => console.log(error));

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
