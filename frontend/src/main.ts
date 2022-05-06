import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ins as axios } from "@/utils/axios";
import VueAxios from "vue-axios";
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

Vue.config.productionTip = false;
Vue.prototype.$socket = socket;

Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
