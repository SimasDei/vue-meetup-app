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
      state.meetup = meetups;
    },
    FETCH_CATEGORIES(state, categories) {
      state.categories = categories;
    },
  },
  actions: {
    fetchMeetups(context) {
      axios
        .get('/api/v1/meetups')
        .then(res => {
          const meetups = res.data;
          context.commit('FETCH_MEETUPS', meetups);
        })
        .catch(error => console.log(error));
    },
    fetchCategories(context) {
      axios
        .get('/api/v1/categories')
        .then(res => {
          const categories = res.data;
          context.commit('FETCH_CATEGORIES', categories);
        })
        .catch(error => console.log(error));
    },
  },
  getters: {
    meetups(state) {
      return state.meetups;
    },
    categories(state) {
      return state.categories;
    },
  },
});
