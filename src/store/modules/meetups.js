import axios from 'axios';
import axiosInstance from '../../services/axios';

export default {
  namespaced: true,

  state: {
    items: [],
    item: {},
  },
  mutations: {
    FETCH_MEETUPS(state, meetups) {
      state.items = meetups;
    },
    FETCH_MEETUP(state, meetup) {
      state.item = meetup;
    },
    CLEAR_ITEMS(state, itemType) {
      if (itemType === 'item') {
        state[itemType] = {};
      }
      state[itemType] = [];
    },
    ADD_USER_TO_MEETUP(state, joinedPeople) {
      state.item.joinedPeople = joinedPeople;
    },
  },
  actions: {
    fetchMeetups({ commit }) {
      commit('CLEAR_ITEMS', 'items');
      axios
        .get('/api/v1/meetups')
        .then(res => {
          const meetups = res.data;
          commit('FETCH_MEETUPS', meetups);
        })
        .catch(error => console.log(error));
    },
    fetchMeetup({ commit }, meetupId) {
      commit('CLEAR_ITEMS', 'item');
      axios
        .get(`/api/v1/meetups/${meetupId}`)
        .then(res => {
          const meetup = res.data;
          commit('FETCH_MEETUP', meetup);
        })
        .catch(error => console.log(error));
    },
    createMeetup({ rootState }, meetup) {
      meetup.meetupCreator = rootState.auth.user;
      meetup.processedLocation = meetup.location
        .toLowerCase()
        .replace(/[\s,]+/g, '')
        .trim();
      return axiosInstance
        .post('/api/v1/meetups', meetup)
        .then(res => res.data)
        .catch(err => console.log(err));
    },
    joinMeetup({ state, rootState, commit, dispatch }, meetupId) {
      const user = rootState.auth.user;
      return axiosInstance
        .post(`/api/v1/meetups/${meetupId}/join`)
        .then(() => {
          dispatch('auth/addMeetupToAuthUser', meetupId, { root: true });
          const joinedPeople = state.item.joinedPeople;
          commit('ADD_USER_TO_MEETUP', [...joinedPeople, user]);
          return true;
        })
        .catch(err => console.log(err));
    },
    leaveMeetup({ state, rootState, commit, dispatch }, meetupId) {
      const user = rootState.auth.user;

      return axiosInstance.post(`/api/v1/meetups/${meetupId}/leave`).then(() => {
        dispatch('auth/removeMeetupToAuthUser', meetupId, { root: true });
        const joinedPeople = state.item.joinedPeople;
        const index = joinedPeople.findIndex(jUser => jUser._id === user._id);
        joinedPeople.splice(index, 1);
        commit('ADD_USER_TO_MEETUP', joinedPeople);
      });
    },
  },
  getters: {
    meetups(state) {
      return state.items;
    },
    meetup(state) {
      return state.item;
    },
  },
};
