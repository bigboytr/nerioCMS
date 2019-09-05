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

  }

}