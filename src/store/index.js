import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    meetups: [],
    categories: [],
    threads: [],
    meetup: {},
  },
  mutations: {
    FETCH_MEETUPS(state, meetups) {
      state.meetups = meetups;
    },
    FETCH_MEETUP(state, meetup) {
      state.meetup = meetup;
    },
    FETCH_THREADS(state, threads) {
      state.threads = threads;
    },
    FETCH_CATEGORIES(state, categories) {
      state.categories = categories;
    },
  },
  actions: {
    fetchMeetups({ commit }) {
      axios
        .get('/api/v1/meetups')
        .then(res => {
          const meetups = res.data;
          commit('FETCH_MEETUPS', meetups);
        })
        .catch(error => console.log(error));
    },
    fetchMeetup({ commit }, meetupId) {
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
    fetchCategories({ commit }) {
      axios
        .get('/api/v1/categories')
        .then(res => {
          const categories = res.data;
          commit('FETCH_CATEGORIES', categories);
        })
        .catch(error => console.log(error));
    },
  },
  getters: {
    meetups(state) {
      return state.meetups;
    },
    meetup(state) {
      return state.meetup;
    },
    threads(state) {
      return state.threads;
    },
    categories(state) {
      return state.categories;
    },
  },
});
