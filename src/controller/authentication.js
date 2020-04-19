/*  eslint-disable */
import firebase from 'firebase';
import store from '@/store/index';
import router from '@/router';
import firebaseConfig from '../firebaseConfig';

firebase.initializeApp(firebaseConfig);

export default {

    login(email, pass) {

        let self = this;

        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(function (user) {

                self.setAuthentication(user.user, true, {});

                router.push('/');

            })
            .catch(function (error) {
                // Handle Errors here.
                const {code, message} = error;

                alert(code + " -- " + message);

                self.setAuthentication({}, false, {});
            });
    },

    logout() {

        let self = this;

        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            self.setAuthentication({}, false, {});
            router.push('/login');

        }).catch((errors) => {

            console.log(errors);

        });

    },

    isLogged() {

        // refresh page function
        let self = this;

        firebase.auth().onAuthStateChanged(function (user) {

            if (!user) {
                self.setAuthentication({}, false, {});
            } else {
                self.setAuthentication(user, true, {});
            }
        });

    },

    setAuthentication(user, token, site) {

        /*
        * parameters values should be
        *
            user => object
            token => boolean
            site => null / key (string)
         */

        localStorage.setItem('user', user);
        localStorage.setItem('token', token);

        store.dispatch('setAuthUser', user);
        store.dispatch('setToken', token);
        //store.dispatch('setSelectedSite', site);

    }
}