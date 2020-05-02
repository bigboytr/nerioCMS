import Vue from 'vue';
import router from './router';
import store from './store';
import Notifications from 'vue-notification'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import App from './App.vue';

import './assets/css/_style.scss';

Vue.use(Notifications);
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
