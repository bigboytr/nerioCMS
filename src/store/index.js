import Vue from 'vue';
import Vuex from 'vuex';
/*import firebase from 'firebase';
import axios from 'axios';*/

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
            urlTypes: [
                {
                    text: "Sayfa",
                    value: 0
                },
                {
                    text: "Link",
                    value: 1
                },
                {
                    text: "Ürün",
                    value: 2
                },
                {
                    text: "İletişim",
                    value: 3
                }]
        },
        pages: {
            list: {}
        },
        sliders: {
            list: {},
            uploadProgress: 0
        },
        sliderCategories: {
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
        SET_MAIN_TITLE(state, value) {
            state.mainTitle = value;
        },
        SET_LIST(state, payload) {
            const {path, list} = payload;
            state[path].list = list;
        },
        SET_PROPERTY(state, payload) {
            const {path, prop, value} = payload;
            state[path][prop] = value
        }
    },
    actions: {
        setAuthUser({commit}, obj) {
            commit('SET_AUTHUSER', obj);
        },
        setToken({commit}, value) {
            commit('SET_TOKEN', value);
        },
        setMainTitle({commit}, value) {
            commit('SET_MAIN_TITLE', value)
        },
        setList({commit}, payload) {
            commit('SET_LIST', payload);
        },
        setProperty({commit}, payload) {
            commit('SET_PROPERTY', payload)
        }
    },

    getters: {
        getToken(state) {
            return state.token;
        },
        getAuthUser(state) {
            return state.authUser;
        },
        getMainTitle(state) {
            return state.mainTitle;
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
            if (state[id])
                return state[id].list;
            else
                return {}
            /*const obj = Object.values(state[id].list);

            return obj.filter((item) => {
                return +item.deleted === 0
            })*/
        },
        getListOfItem: (state) => (path, id, field) => {

            const list = state[path].list;

            return list.find((item) => {
                return parseInt(item[field], 10) === id
            })
        },
        getUrlTypes: (state) => (i) => {
            if (i !== undefined) {
                return state.navigation.urlTypes[+i].text;
            } else {
                return state.navigation.urlTypes;
            }
        }
    },
});

export default store;
