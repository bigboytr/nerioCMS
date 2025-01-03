import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index'

// views
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Navigation from './views/Navigation'
import NavigationForm from './views/NavigationForm'
import Pages from './views/Pages'
import PagesForm from './views/PagesForm'
import Sliders from './views/Sliders'
import SlidersForm from './views/SlidersForm'
import Products from './views/Products'
import ProductDetails from './views/ProductDetails'
import Contacts from './views/Contacts'
import ContactForm from './views/ContactForm'

Vue.use(Router);

function routerSetter(title) {
  store.dispatch('setMainTitle', title);
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/', component: Home, beforeEnter: (to, from, next) => {
        routerSetter("Dashboard");
        next()
      }
    },
    {
      path: '/login', component: Login, beforeEnter: (to, from, next) => {
        if (from !== 'login') next();
      }
    },
    {
      path: '/navigation', component: Navigation, beforeEnter: (to, form, next) => {
        routerSetter("Navigasyon");
        next()
      }
    },
    {
      path: '/navigation-form', component: NavigationForm, beforeEnter: (to, form, next) => {
        routerSetter("Navigasyon Form");
        next()
      }
    },
    {
      path: '/pages', component: Pages, beforeEnter: (to, form, next) => {
        routerSetter("Sayfalar");
        next()
      }
    },
    {
      path: '/pages-form', component: PagesForm, beforeEnter: (to, form, next) => {
        routerSetter("Sayfa Ekle");
        next()
      }
    },
    {
      path: '/slider', component: Sliders, beforeEnter: (to, from, next) => {
        routerSetter("Slider");
        next()
      }
    },
    {
      path: '/slider-form', component: SlidersForm, beforeEnter: (to, from, next) => {
        routerSetter("Slider");
        next()
      }
    },
    {
      path: '/contact', component: Contacts, beforeEnter: (to, from, next) => {
        routerSetter("İletişim Bilgileri");
        next()
      }
    },
    {
      path: '/contact-form', component: ContactForm, beforeEnter: (to, from, next) => {
        routerSetter("İletişim Bilgileri");
        next()
      }
    },
    {
      path: '/products', component: Products, beforeEnter: (to, from, next) => {
        routerSetter("Ürünler");
        next()
      }
    },
    {
      path: '/product-details',
      name: 'product-details',
      component: ProductDetails,
      props: true,
      beforeEnter: (to, from, next) => {
        routerSetter("Ürün Detayları");
        next()
      }
    }
  ],
});
