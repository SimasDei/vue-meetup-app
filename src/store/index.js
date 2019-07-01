import Vue from 'vue';
import Vuex from 'vuex';

import meetups from './modules/meetups';
import categories from './modules/categories';
import threads from './modules/threads';
import auth from './modules/auth';
import stats from './modules/stats';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    meetups,
    categories,
    threads,
    auth,
    stats,
  },
  mutations: {
    ADD_ITEM(state, { item, index, resource }) {
      Vue.set(state[resource].items, index, item);
    },
  },
});
