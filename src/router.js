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
  store.dispatch('setMainTitle', title);
}

export default new Router({
  mode: 'history',
  routes: [
    /*{path: '/', component: Home, beforeEnter: (to, from, next) => {
            console.log(to);
            routerSetter("Dashboard")
        }},
    {path: '/login', component: Login, beforeRouteEnter: auth.isLogged()},
    {path: '/site-selection', component: SiteSelection },
    {path: '/navigation', component: Navigation, beforeEnter: (to, from, next) => {
            routerSetter("Navigasyon")
        }},
    {path: '/content', component: Navigation, beforeEnter: (to, from, next) => {
            routerSetter("İçerik")
        }},
    {path: '/slider', component: Navigation, beforeEnter: (to, from, next) => {
            routerSetter("Slider")
        }},
    {path: '/contact', component: Navigation, beforeEnter: (to, from, next) => {
            routerSetter("İletişim")
        }},
    {path: '/products', component: Navigation, beforeEnter: (to, route, next) => {
            routerSetter("Denemeler")
        }},*/

      {path: '/', component: Home, beforeEnter: (to, from, next) => { routerSetter("Dashboard"); next() }},
      {path: '/login', component: Login, beforeEnter: auth.isLogged()},
      {path: '/site-selection', component: SiteSelection },
      {path: '/navigation', component: Navigation, beforeEnter: (to, form, next) => { routerSetter("Navigasyon"); next() } },
      {path: '/content', component: Navigation, beforeEnter: (to, form, next) => { routerSetter("İçerik") } },
      {path: '/slider', component: Navigation, beforeEnter: (to, from, next) => { routerSetter("Slider") }}

      /*{path: '/', component: Home },
      {path: '/login', component: Login, beforeEnter: auth.isLogged()},
      {path: '/site-selection', component: SiteSelection },
      {path: '/navigation', component: Navigation }*/
  ],
});
