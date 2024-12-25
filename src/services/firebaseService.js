import {initializeApp} from "firebase/app";
import {firebaseConfig} from "../firebaseConfig";
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import store from "../store";
import router from "../router";

class FirebaseService {
  fbApp = null;
  fbAuth = null;

  constructor() {
    this.fbApp = initializeApp(firebaseConfig);
    this.fbAuth = getAuth(this.fbApp);
  }

  fb_signIn(email, password) {
    return signInWithEmailAndPassword(this.fbAuth, email, password)
      .then(user => {
        return user;
      })
      .catch(error => {
        return error;
      });
  }

  fb_signOut() {
    return signOut(this.fbAuth);
  }

  async fb_getAuthenticatedUser() {
    // if (!this._checkIsTokenExists()) {
      await onAuthStateChanged(this.fbAuth, user => {
        console.log(user);
        if (user) {
          store.dispatch('setAuthUser', user.email);
          store.dispatch('setToken', user.accessToken);
          localStorage.setItem('user', user.email);
          localStorage.setItem('token', user.accessToken);
          router.push('/');
        } else {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          store.dispatch('setAuthUser', null);
          store.dispatch('setToken', null);
          router.push('/login');
        }
      });
    // }
  }

  _checkIsTokenExists() {
    return localStorage.getItem('token');
  }
}

export const firebaseService = new FirebaseService();
