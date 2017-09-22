// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Icon from 'vue-svg-icon/Icon.vue'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import store from './Vuex/Store'

Vue.config.productionTip = false
Vue.component('icon', Icon)
Vue.prototype.$http = axios
Vue.use(VueAwesomeSwiper)

if (true) {
	window.apiAddress = "http://127.0.0.1:3000"
}else{
	window.apiAddress = "http://120.25.107.16:3000"
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
