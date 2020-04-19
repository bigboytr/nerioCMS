import Vue from 'vue';
import router from './router';
import store from './store';
import Notifications from 'vue-notification'
import App from './App.vue';

import './assets/css/_style.scss';

Vue.use(Notifications);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
