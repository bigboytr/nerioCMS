import firebase from 'firebase'
import store from '@/store/index'

export default {

    getAll() {

        let list = [];

        firebase.firestore().collection('navigation').get().then((snapshot) => {

            snapshot.docs.map((item) => {

                const {title, path, queue, target, type, active, deleted} = item.data();
                list.push({
                    id: item.id,
                    title,
                    path,
                    queue,
                    target,
                    type,
                    active,
                    deleted
                })
            })

        }).then(() =>{

            store.dispatch('setList', {
                path: 'navigation',
                list: list
            });
        })

    },

    save(dto) {

        let user = store.getters.getAuthUser;
        let selectedSites = store.getters.getSelectedSite;

        let reference = `/profiles/${user.uid}/sites/${selectedSites.key}/navigation/`;

        return new Promise((res, rej) => {

            firebase.database().ref(reference).push(dto).then(function (result) {
                //console.log(result);

                store.dispatch('setList', 'navigation');
                res(true);
            }).catch((err) => {
                rej(err);
                console.log(err);
            });
        });
    }
}
