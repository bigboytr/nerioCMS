import Vue from 'vue';
import Router from 'vue-router';
import auth from '@/controller/authentication';
import store from '@/store/index'

// views
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Navigation from './views/Navigation'
import SiteSelection from './views/SiteSelection'

Vue.use(Router);

function routerSetter(title) {
  auth.isLogged();
  store.dispatch('setMainTitle', title);
}

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', component: Home, beforeEnter: routerSetter("Dashboard")},
    {path: '/login', component: Login, beforeEnter: auth.isLogged()},
    {path: '/site-selection', component: SiteSelection, beforeEnter: routerSetter("Site Seçim")},
    {path: '/navigation', component: Navigation, beforeEnter: routerSetter("Navigasyon")}
  ],
});
