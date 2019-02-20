import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    firebase: {
      config: {
        apiKey: 'AIzaSyB-1f7dzkVgIyDOdEHiUgT-1mlsjXL_5VU',
        authDomain: 'neriocms.firebaseapp.com',
        databaseURL: 'https://neriocms.firebaseio.com',
        projectId: 'ner2iocms',
        storageBucket: 'neriocms.appspot.com',
        messagingSenderId: '355445654956',
      },
    },
    token: false,
    authUser: {},
    mainTitle: "Dashboard"
  },
  mutations: {
    SET_AUTHUSER(state, obj) {
      state.authUser = obj;
    },
    SET_TOKEN(state, value) {
      state.token = value;
    },
    SET_MAIN_TITLE(state, value) {
      state.mainTitle = value;
    }
  },
  actions: {
    setAuthUser({ commit }, obj) {
      commit('SET_AUTHUSER', obj);
    },
    setToken({ commit }, value) {
      commit('SET_TOKEN', value);
    },
    setMainTitle({ commit }, value) {
      commit('SET_MAIN_TITLE', value)
    }
  },

  getters: {
    getToken(state) {
      return state.token;
    },
    getConfig(state) {
      return state.firebase.config;
    },
    getMainTitle(state) {
      return state.mainTitle;
    }
  },
});

export default store;
