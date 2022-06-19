import { createApp } from 'vue';
import router from './router/router.js';
import store from './store/store.js';
import App from './App.vue';

createApp(App).use(router).use(store).mount('#app');
