import axios from 'axios';

export default {
  namespaced: true,

  state: {
    items: [],
  },
  mutations: {
    FETCH_CATEGORIES(state, categories) {
      state.categories = categories;
    },
  },
  actions: {
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
  getters: {},
};
