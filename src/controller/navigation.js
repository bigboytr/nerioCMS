import firebase from 'firebase'
import store from '@/store/index'

export default {

    getAll() {

        /*let user = store.getters.getAuthUser;
        let selectedSites = store.getters.getSelectedSite;

        let reference = `/profiles/${user.uid}/sites/${selectedSites.key}/navigation/`;

        return new Promise((res, rej) => {

            firebase.database().ref(reference).once('value').then(function (response) {

                res(response.val());

            }).catch((errors) => {

                rej(errors);
            })


        });*/

    },

    save(dto) {

        let user = store.getters.getAuthUser;
        let selectedSites = store.getters.getSelectedSite;

        let reference = `/profiles/${user.uid}/sites/${selectedSites.key}/navigation/`;

        return new Promise((res, rej) => {

            firebase.database().ref(reference).push(dto).then(function (result) {
                console.log(result);

                store.dispatch('setList', 'navigation');

            }).catch((err) => {
                console.log(err);
            });
        });
    }
}
