import firebase from 'firebase'
import store from '@/store/index'

export default {

    getAll() {

        return new Promise((res, rej) => {

            firebase.database().ref('/navigation/').once('value').then(function (response) {

                res(response.val());

            }).catch((errors) => {

                rej(errors);
            })


        });

    },

    save(dto) {

        return new Promise((res, rej) => {

            firebase.database().ref('/navigation/').push({
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