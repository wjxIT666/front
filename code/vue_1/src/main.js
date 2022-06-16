import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import Header from './components/Header.vue';
Vue.component('Header', Header);
import Footer from './components/Footer.vue';
Vue.component('Footer', Footer);

import api from './request/api.js';
Vue.prototype.$api = api;

import './rem/rem.js';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
