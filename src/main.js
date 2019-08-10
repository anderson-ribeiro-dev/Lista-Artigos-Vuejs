import 'font-awesome/css/font-awesome.css'

import Vue from 'vue'

import './config/bootstrap'
import './config/msgs'
import './config/axios'
import './config/mq'
import App from './App'
import store from './config/stories'
import router from './config/router'

Vue.config.productionTip = false

//Temporário!
// require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6ImFuZGVyc29uIHNpbHZhIHJpYmVpcm8iLCJlbWFpbCI6ImFuZGVyc29uc2lsdmFyaWJlaXJvQGdtYWlsLmNvbSIsImFkbWluIjp0cnVlLCJpYXQiOjE1NjMwNTIwMTMsImV4cCI6MTU2MzMxMTIxM30.iv4Lf_J99NqHjCsc-1jixOSZS4tcRMX0KZCx82deOgE'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')