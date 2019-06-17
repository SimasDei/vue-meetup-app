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
  },
  actions: {
    async register(payload) {
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
  },
};
