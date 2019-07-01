import axios from 'axios';

export default {
  namespaced: true,
  state: {
    isLocationResolved: false,
    item: {
      city: null,
      country: null,
    },
  },
  mutations: {
    SET_ITEM(state, item) {
      state.item = item;
    },
    RESOLVE_LOCATION(state, status) {
      state.isLocationResolved = status;
    },
  },
  actions: {
    fetchMetaData({ commit }) {
      return axios
        .get('/api/v1')
        .then(res => {
          const meta = res.data;
          commit('SET_ITEM', meta);
          commit('RESOLVE_LOCATION', true);
          return meta;
        })
        .catch(error => {
          console.log(error);
          commit('RESOLVE_LOCATION', true);
        });
    },
  },
  getters: {
    location(state) {
      const { city, country } = state.item;
      const location = `${city}, ${country}`;
      return city && country ? location : '';
    },
    locationResolved(state) {
      return state.isLocationResolved;
    },
  },
};
