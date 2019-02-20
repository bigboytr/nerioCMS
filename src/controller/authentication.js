/*  eslint-disable */
import firebase from 'firebase';
import store from '@/store/index';
import router from '@/router';

const config = store.getters.getConfig;
firebase.initializeApp(config);

export default {

  login(email, pass) {

        firebase.auth().signInWithEmailAndPassword(email, pass)
          .then(function (user) {
            localStorage.token = true;
            store.dispatch('setAuthUser', user);
            store.dispatch('setToken', true);

            router.push('/');
          })
          .catch(function (error) {
            // Handle Errors here.
            //var errorCode = error.code;
            //var errorMessage = error.message;
            localStorage.token = false;
            store.dispatch('setAuthUser', {});
            store.dispatch('setToken', false);
          });
  },

  logout() {

    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      store.dispatch('setToken', false);
      store.dispatch('setAuthUser', null);

      router.push('/login');
    }).catch((errors) => {

      console.log(errors);

    });

  },

  isLogged() {

    firebase.auth().onAuthStateChanged(function(user) {

      if (!user) {

        localStorage.token = false;
        store.dispatch('setAuthUser', {});
        store.dispatch('setToken', false);

        router.push('/login');

      } else {

        localStorage.token = true;
        store.dispatch('setAuthUser', user);
        store.dispatch('setToken', true);

        router.push('/');
      }
    });

  }
}