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
            refCMS: "nerioCMS"
        },
        token: false,
        authUser: {},
        selectedSite: {
            key: undefined,
            title: undefined
        },
        mainTitle: "Dashboard"
    },
    mutations: {
        SET_AUTHUSER(state, obj) {
            state.authUser = obj;
        },
        SET_TOKEN(state, value) {
            state.token = value;
        },
        SET_SELECTED_SITE(state, payload) {
            state.selectedSite.key = payload.key;
            state.selectedSite.title = payload.title;
        },
        SET_MAIN_TITLE(state, value) {
            state.mainTitle = value;
        }
    },
    actions: {
        setAuthUser({commit}, obj) {
            commit('SET_AUTHUSER', obj);
        },
        setToken({commit}, value) {
            commit('SET_TOKEN', value);
        },
        setSelectedSite({commit}, payload) {
            commit('SET_SELECTED_SITE', payload);
        },
        setMainTitle({commit}, value) {
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
        getRefCMS(state) {
            return state.firebase.refCMS;
        },
        getAuthUser(state) {
            return state.authUser;
        },
        getMainTitle(state) {
            return state.mainTitle;
        },
        getSelectedSite(state) {
            return state.selectedSite;
        }
    },
});

export default store;
