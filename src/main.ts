import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import './assets/css/fonts.css';
import '@mdi/font/css/materialdesignicons.css';
import './assets/css/index.css';

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
    router, render: h => h(App)
}).$mount('#app');
