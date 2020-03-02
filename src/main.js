import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VCharts from 'v-charts'
import 'v-charts/lib/style.css'

import './assets/css/global.css'

import './assets/icon/iconfont.css'

import axios from 'axios'


axios.defaults.baseURL = 'http://127.0.0.1:5000/';
axios.interceptors.request.use(config => {
  config.headers.Authorization = 'Token ' + window.sessionStorage.getItem('token');
  return config
});

axios.interceptors.response.use(function (response) {
  return response
}, error => {
  if (error.status.code === 401) {
    this.$router.push('/login')
  }
});
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VCharts);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
