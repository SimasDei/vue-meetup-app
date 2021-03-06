import axios from 'axios';
import jwt from 'jsonwebtoken';
import axiosInstance from '@/services/axios';

import router from '@/router/';
import { throwError } from '@/helpers/';

function checkTokenValidity(token) {
  if (token) {
    const decodedToken = jwt.decode(token);
    return decodedToken && decodedToken.exp * 1000 > new Date().getTime();
  }
  return false;
}

export default {
  namespaced: true,

  state: {
    user: null,
    isAuthResolved: false,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_AUTH_STATE(state, value) {
      state.isAuthResolved = value;
    },
    SET_MEETUPS_TO_AUTH_USER(state, meetups) {
      state.user.joinedMeetups = meetups;
    },
  },
  actions: {
    async register(context, payload) {
      try {
        return axios.post('/api/v1/users/register', payload);
      } catch (error) {
        console.log(error);
        return throwError('Invalid User Information');
      }
    },
    login({ commit }, payload) {
      return axios
        .post('/api/v1/users/login', payload)
        .then(res => {
          const user = res.data;
          localStorage.setItem('meetup-jwt', user.token);
          router.push('/');
          commit('SET_USER', user);
        })
        .catch(error => {
          console.log({ msg: error });
          return throwError('Invalid User Information');
        });
    },
    async getAuthUser({ commit, getters }) {
      const user = getters['user'];
      const token = localStorage.getItem('meetup-jwt');
      const isTokenValid = checkTokenValidity(token);

      if (user && isTokenValid) return Promise.resolve(user);

      try {
        const res = await axiosInstance.get('/api/v1/users/me');
        const user = res.data;
        localStorage.setItem('meetup-jwt', user.token);
        commit('SET_USER', user);
        commit('SET_AUTH_STATE', true);
        return user;
      } catch (error) {
        commit('SET_USER', null);
        commit('SET_AUTH_STATE', true);
        console.log({ msg: error });
        return error;
      }
    },
    updateUser({ commit }, user) {
      return axiosInstance
        .patch(`/api/v1/users/${user._id}`, user)
        .then(res => {
          const user = res.data;
          commit('SET_USER', user);
          return user;
        })
        .catch(error => console.log(error));
    },
    addMeetupToAuthUser({ commit, state }, meetupId) {
      const userMeetups = [...state.user['joinedMeetups'], meetupId];
      commit('SET_MEETUPS_TO_AUTH_USER', userMeetups);
    },
    removeMeetupToAuthUser({ commit, state }, meetupId) {
      const userMeetupsIds = [...state.user['joinedMeetups']];
      const index = userMeetupsIds.findIndex(userMeetupId => userMeetupId === meetupId);
      userMeetupsIds.splice(index, 1);
      commit('SET_MEETUPS_TO_AUTH_USER', userMeetupsIds);
    },
    async logout({ commit }) {
      /**
       * @auth - Alternative for Session Verification Strategy
       * 
      try {
        await axios.post('/api/v1/users/logout');
        localStorage.removeItem('meetup-jwt');
        return commit('SET_USER', null);
      } catch (error) {
        console.log(error);
        return error;
      }
       */

      return new Promise(resolve => {
        localStorage.removeItem('meetup-jwt');
        commit('SET_USER', null);
        resolve(true);
      });
    },
  },
  getters: {
    user(state) {
      return state.user || null;
    },
    isAuthenticated(state) {
      return !!state.user;
    },
    isAuthResolved(state) {
      return state.isAuthResolved;
    },
    isMeetupOwner: state => ownerId => {
      if (!state.user) return false;
      return state.user._id === ownerId;
    },
    isMember: state => meetupId => {
      if (!state.user) return false;
      return state.user['joinedMeetups'] && state.user['joinedMeetups'].includes(meetupId);
    },
  },
};
