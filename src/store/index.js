import Vue from 'vue';
import Vuex from 'vuex';

import meetups from './modules/meetups';
import categories from './modules/categories';
import threads from './modules/threads';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    meetups,
    categories,
    threads,
  },
});
