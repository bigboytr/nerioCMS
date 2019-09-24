/*  eslint-disable */
import firebase from 'firebase';
import store from '@/store/index';
import router from '@/router';

const config = store.getters.getConfig;
firebase.initializeApp(config);

export default {

    login(email, pass) {

        let self = this;

        firebase.auth().signInWithEmailAndPassword(email, pass)
            .then(function (user) {

                store.dispatch('setAuthUser', user.user);
                router.push('/site-selection');
            })
            .catch(function (error) {
                // Handle Errors here.
                //var errorCode = error.code;
                //var errorMessage = error.message;

                self.setAuthentication({}, false, null);
            });
    },

    logout() {

        let self = this;

        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            self.setAuthentication({}, false, null);
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

                self.setAuthentication({}, false, null);
                router.push('/login');

            } else {

                store.dispatch('setAuthUser', user);

                if (store.getters.getSelectedSite !== null) {

                    localStorage.token = true;
                    store.dispatch('setToken', true);

                    router.push('/');
                } else {

                    localStorage.token = false;
                    store.dispatch('setToken', false);
                    router.push('/site-selection');
                }

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

        localStorage.token = token;
        store.dispatch('setAuthUser', user);
        store.dispatch('setToken', token);
        store.dispatch('setSelectedSite', site);

    }
}