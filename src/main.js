import Vue from 'vue';
import router from './router';
import store from './store/index';
import App from './App.vue';

import './assets/css/_style.scss';


Vue.config.productionTip = false;

let vm = new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
