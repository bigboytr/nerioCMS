import firebase from 'firebase'
import store from '@/store/index'

const moduleName = "/contents/";

export default {

    getAll() {
        /*let user = store.getters.getAuthUser;
        let selectedSites = store.getters.getSelectedSite;

        let reference = `/profiles/${user.uid}/sites/${selectedSites.key}${moduleName}`;

        firebase.database().ref(reference).once('value').then(function (response) {

            store.dispatch('setContentList', response.val())

        }).catch((errors) => {

            throw(errors);
        })*/
    },

    save(dto) {

        let user = store.getters.getAuthUser;
        let selectedSites = store.getters.getSelectedSite;

        let reference = `/profiles/${user.uid}/sites/${selectedSites.key}/contents/`;

        return new Promise((res, rej) => {

            firebase.database().ref(reference).push(dto).then(function (result) {
                //console.log(result);

                store.dispatch('setList', 'contents');
                res(true);

            }).catch((err) => {
                rej(err);
                console.log(err);
            });
        });
    }
}