import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import Breadcrumbs from './components/bread_crumbs'
import { store } from './store';
import VueFeather from 'vue-feather';
import Toasted from 'vue-toasted';
import axios from 'axios'

import { Vue2Dragula } from 'vue2-dragula';

import PxCard  from './components/Pxcard.vue'
Vue.component(PxCard.name, PxCard)

// Import Theme scss
import './assets/scss/app.scss'


Vue.use(Toasted,{
  iconPack: 'fontawesome'
});
Vue.use(Vue2Dragula);

Vue.use(VueFeather);
Vue.use(BootstrapVue)
Vue.component('Breadcrumbs', Breadcrumbs)
global.base_first = 'http://192.168.8.100:8080'
global.base_url = global.base_first+"/api/v1/file-module"
axios.defaults.baseURL = global.base_url;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.put['Access-Control-Allow-Origin'] = 'http://192.168.8.100:8080';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://192.168.8.100:8080';
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')