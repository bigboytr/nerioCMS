import firebase from 'firebase'
import store from '@/store/index'

export default {

    getAll() {

        let user = store.getters.getAuthUser;
        let selectedSites = store.getters.getSelectedSite;

        let reference = `/profiles/${user.uid}/sites/${selectedSites.key}/navigation/`;

        return new Promise((res, rej) => {

            firebase.database().ref(reference).once('value').then(function (response) {

                res(response.val());

            }).catch((errors) => {

                rej(errors);
            })


        });

    },

    save(dto) {

        let user = store.getters.getAuthUser;
        let selectedSites = store.getters.getSelectedSite;

        let reference = `/profiles/${user.uid}/sites/${selectedSites.key}/navigation/`;

        return new Promise((res, rej) => {

            firebase.database().ref(reference).push({
                parent: dto.parent,
                title: dto.title,
                target: dto.target,
                type: 0,
                url: dto.url
            }).then(function (result) {

                res(result);
            });
        });
    }

}