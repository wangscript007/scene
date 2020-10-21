import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// element-ui
import ElementUI from 'element-ui'
import '@/assets/scss/element-variables.scss'

// iconfont
import '@/assets/iconfont/iconfont.css'

// style
import '@/assets/scss/reset.scss'

// vue-cookies
import VueCookies from 'vue-cookies'

// request
import request from './utils/request'

import message from '@/utils/validate'
import './plugins/element.js'
Vue.prototype.$msg = message

Vue.prototype.$http = request

Vue.prototype.domain = process.env.VUE_APP_API_URL

import axios from 'axios';
Vue.prototype.$axios = axios;

Vue.use(VueCookies)

Vue.use(ElementUI)


Vue.config.productionTip = false

Vue.component('HandleDialog', () => import('@/components/HandleDialog'))
Vue.component('Pages', () => import('@/components/Pages'))
Vue.component('Search', () => import('@/components/Search'))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
