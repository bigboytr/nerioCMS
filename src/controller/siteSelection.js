import firebase from 'firebase';
import store from '@/store/index';
import auth from '@/controller/authentication';

export default {

    createProfile(dto) {

        let authId = store.getters.getAuthUser.uid;

        return new Promise((res, rej) => {

            if (dto.title) {
                firebase.database().ref("/profiles/" + authId + "/sites").push({
                    title: dto.title
                }).then((snap) => {
                    res(snap.key);
                })
            }
        })

    },

    siteSelected(key, title) {

        let authId = store.getters.getAuthUser.uid;

        return new Promise((res, rej) => {

            if (key) {

                if (authId) {

                    localStorage.token = true;
                    store.dispatch('setToken', true);
                    store.dispatch("setSelectedSite", {key, title});

                    // Fill the lists
                    //store.dispatch('setList', 'navigation');
                    //store.dispatch('setList', 'contents');
                    store.dispatch('setListMysql', {
                        path: "contents",
                        table: "table_contents"
                    });
                }

                res(true);
            } else {

                rej(true);
            }
        })

    },

    getProfiles(vm) {

        return new Promise((res, rej) => {

            let authId = store.getters.getAuthUser.uid;
            let returnList = {};

            firebase.database().ref("/profiles/"+authId+"/sites").once("value").then((val) => {

                let response = val.val();

                Object.keys(response).map((key) => {
                    //console.log(key);
                    //console.log(obj);
                    //console.log(response[key].title);
                    let title = response[key].title;
                    vm.$set(returnList, key, title);
                });


            }).then(() => {
                res(returnList);
            })

        })

    }

}