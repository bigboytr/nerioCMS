import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import axios from 'axios';

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
            refCMS: "nerioCMS" // unused
        },
        apiPath: 'http://gencpro.com/nerio/slim',
        token: false,
        authUser: {},
        selectedSite: {
            key: undefined,
            title: undefined
        },
        mainTitle: "Dashboard",
        navigation: {
            list: {},
            urlTypes: ["Sayfa", "Link", "Ürün","İletişim"]
        },
        contents: {
            list: {}
        },
        sliders: {
            list: {},
            categories: {}
        }
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
        },
        SET_CONTENTS(state, value) {
            state.contents.list = value;
        },
        SET_NAVIGATION_LIST(state, value) {
            state.navigation.list = value;
        },
        SET_LIST(state, payload) {
            state[payload.path].list = payload.value
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
        },
        setContentList({commit}, value) {
            commit('SET_CONTENTS', value)
        },
        setList({commit}, path) {

            let user = this.getters.getAuthUser;
            let selectedSites = this.getters.getSelectedSite;

            let reference = `/profiles/${user.uid}/sites/${selectedSites.key}/${path}/`;

            const setLoad = {
                path: path
            };

            firebase.database().ref(reference).once('value').then(function (response) {

                setLoad.value = response.val();

                commit('SET_LIST', setLoad);

            }).catch((errors) => {

                setLoad.value = errors;
                commit('SET_LIST', setLoad);

            })
        },

        setListMysql({commit}, payload) {

            const apiPath = store.getters.getApiPath;

            axios({
                method: 'POST',
                data: {
                    dto: payload.dto,
                    table: payload.table
                },
                url: `${apiPath}/api/getAll`,

            }).then((response) => {

                commit('SET_LIST', {
                    path: payload.path,
                    value: response.data
                });

            }).catch((err) => {

                commit('SET_LIST', {
                    path: payload.path,
                    value: err
                });
            });
        }
    },

    getters: {
        getApiPath(state) {
           return state.apiPath;
        },
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
        },
        getNavigationList: (state) => (parent) => {

            //const obj = Object.assign({}, ...state.navigation.list);
            const obj = Object.values(state.navigation.list);

            return obj.filter((item) => {
                return parseInt(item.parent, 10) === parent
            })

            /*return Object.keys(state.navigation.list).filter((idx) => {
                idx = parseInt(idx, 10);
                const item = state.navigation.list[idx];

                return parseInt(item.parent, 10) === parent
                ? item : continue

            })*/
        },
        getList: (state) => (id) => {
            return state[id].list
        },
        getUrlTypes: (state) => (i) => {
            if (!isNaN(i) && i !== undefined) {
                return state.navigation.urlTypes[i];
            } else {
                return state.navigation.urlTypes;
            }
        }
    },
});

export default store;
