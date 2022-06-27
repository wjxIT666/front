import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '../../store/index.js';

Vue.config.productionTip = false;

//引入axios拦截器
import api from '../../request/api.js';
Vue.prototype.$api = api;

//全局引入element-ui
import ElementUI from 'element-ui';
Vue.use(ElementUI);
import 'element-ui/lib/theme-chalk/index.css';

//引入样式
import '../../scss/index.scss';

//引入字体图标
import '../../icon/iconfont.css';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
