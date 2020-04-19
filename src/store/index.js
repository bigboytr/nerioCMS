import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        apiPath: 'http://gencpro.com/nerio/slim',
        token: false,
        authUser: {},
        selectedSite: {
            key: undefined,
            title: undefined
        },
        selectedRows: {
            ids: []
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
            list: {}
        },
        slidersCategories: {
            list: {}
        },
        products: {
            list: {}
        },
        productsPrice: {
            list: {}
        },
        productsContents: {
            list: {}
        },
        contacts: {
            list: {}
        },
        contactDetails: {
            list: {}
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
        SET_SELECTEDROW_ID(state, value) {
            if (!state.selectedRows.ids.includes(value))
                state.selectedRows.ids = [...state.selectedRows.ids, value];
            else
                state.selectedRows.ids = state.selectedRows.ids.filter((item) => {
                    return item !== value
                })

            //state.selectedRows.ids.push(value);
        },
        SET_SELECTEDROWS_EMPTY(state) {
            state.selectedRows.ids = [];
        },
        SET_CONTENTS(state, value) {
            state.contents.list = value;
        },
        SET_NAVIGATION_LIST(state, value) {
            state.navigation.list = value;
        },
        SET_LIST(state, payload) {
            const {path, list} = payload;
            state[path].list = list;
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
        setSelectedRowId({commit}, value) {
            commit('SET_SELECTEDROW_ID', value)
        },
        setSelectedRowsEmpty({commit}) {
            commit('SET_SELECTEDROWS_EMPTY')
        },
        setContentList({commit}, value) {
            commit('SET_CONTENTS', value)
        },
        setList({commit}, payload) {

            commit('SET_LIST', payload);

            /*let user = this.getters.getAuthUser;
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

            })*/
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
        getSelectedRows(state) {
            return state.selectedRows.ids;
        },
        getRecursiveList: (state) => (path) => {

            //const obj = Object.assign({}, ...state.navigation.list);
            const obj = Object.values(state[path].list);

            return obj.filter((item) => {
                item['children'] = [];

                if (+item.parent === 0) {
                    // root item
                    const child = obj.filter((childItem) => {
                        return +item.id === +childItem.parent;
                    })

                    //console.log(child);
                    item.children = [...item.children, ...child];
                    //item.children = [...item.children, {...item.children, ...child}];

                    return item;
                }
            });
        },
        getList: (state) => (id) => {
            //return state[id].list;
            const obj = Object.values(state[id].list);

            return obj.filter((item) => {
                return +item.deleted === 0
            })

        },
        getListOfItem: (state) => (path, id, field) => {

            const list = state[path].list;

            return list.find((item) => {
                return parseInt(item[field], 10) === id
            })
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
