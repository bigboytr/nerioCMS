import {initializeApp} from 'firebase/app';
import store from '@/store/index';
import swal from 'sweetalert2';
import axios from 'axios';
import {firebase} from "../services/firebaseService";

export default {

    createProfile(dto) {

        let authId = store.getters.getAuthUser.uid;

        return new Promise((res, rej) => {

            const {title, dbName, dbUser, dbPass} = dto;
            const path = `/profiles/${authId}/sites`;

            if (title) {

                firebase.database().ref(path).push({
                    title
                }).then((snap) => {
                    return snap.key

                }).then((id) => {

                    firebase.database().ref(`${path}/${id}/dbConfig`).set({

                            dbName,
                            dbUser,
                            dbPass

                    }, (error) => {
                        if (error) {
                            console.log(error);
                            rej(false)
                        }
                        else
                            res(true)
                    })
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

                    const apiPath = store.getters.getApiPath;

                    axios({
                        method: 'POST',
                        data: {
                            dbN: 'gencproc_neriocms',
                            dbU: 'gencproc_nerioad',
                            dbP: '/*96321nerio'
                        },
                        url: `${apiPath}/api/connect`,

                    }).then(() => {

                        console.log('Connected');
                        res(true);
                    }).catch((err) => {

                        console.log('Not connected');
                        console.log(err);

                    });

                    // Fill the lists
                    //store.dispatch('setList', 'navigation');
                    //store.dispatch('setList', 'contents');
                    /*store.dispatch('setListMysql', {
                        path: "contents",
                        table: "table_contents"
                    });

                    store.dispatch('setListMysql', {
                        path: "navigation",
                        table: "table_navigation"
                    });*/
                }


            } else {

                rej(true);
            }
        })
    },

    getProfiles() {

        return new Promise((res, rej) => {

            const authId = store.getters.getAuthUser.uid;
            //let returnList = null;

            try {
                firebase.database().ref("/profiles/" + authId + "/sites").on("value", (val) => {

                    //let response = val.val();
                    /*if (response !== null) {
                        Object.keys(response).map((key) => {
                            //const {title, dbConfig} = response[key];
                            vm.$set(returnList, key, response[key]);
                            //vm.$set(returnList, key, {title, dbConfig});
                        });
                    }*/
                    //res(returnList);
                    res(val.val());
                });
            } catch (e) {
                rej(e)
            }



            /*firebase.database().ref("/profiles/"+authId+"/sites").once("value").then((val) => {

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
            })*/
        })
    },

    removeProfile(id) {
        // @id is key of site on firebase DB

        return new Promise((res, rej) => {

            swal.fire({
                title: 'Emin misiniz ?',
                text: 'Site profili silinecek !',
                icon: 'warning',
                buttonsStyling: false,
                reverseButtons: true,
                showCancelButton: true,
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-warning mr-3'
                },
                confirmButtonText: 'Sil',
                cancelButtonText: 'Vazgeç'
            }).then((confirm) => {

                if (confirm.value === true) {

                    let authId = store.getters.getAuthUser.uid;

                    firebase.database().ref(`/profiles/${authId}/sites/${id}`)
                        .remove()
                        .then(() => {
                            res(true);
                        })
                        .catch((err) => {
                            console.log(err)
                            rej(false)
                    });
                }
            });
        })
    }

}
