/*  eslint-disable */
import {firebaseService} from "../services/firebaseService";
import store from '@/store';
import router from '@/router';


export class AuthenticationController {

  async login(email, pass) {
    try {
      await firebaseService.fb_signIn(email, pass);
    } catch (error) {
      // Handle Errors here.
      const {code, message} = error;
      alert(code + " -- " + message);
    }
  }

  async logout() {
    try {
      await firebaseService.fb_signOut();
    } catch (error) {
      const {code, message} = error;
      alert(code + " -- " + message);
    }
  }

  async getAuthenticatedUser() {
    // if (!this._checkIsTokenExists()) {
      await firebaseService.fb_getAuthenticatedUser();
    // }
  }


  _checkIsTokenExists() {
    return localStorage.getItem('token');
  }

/*  () {
    const email = localStorage.getItem('user');
    const accessToken = localStorage.getItem('token');

    const user = {
      email,
      accessToken,
    }
  }*/
}

export const authentication = new AuthenticationController();
