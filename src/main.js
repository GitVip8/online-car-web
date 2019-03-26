// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// element ui
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
// axios
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUi)
Vue.prototype.$axios = axios
axios.interceptors.request.use(
  config => {
    config.withCredentials = true
    config.timeout = 6000
    let token = sessionStorage.getItem('access_token')
    if (token) {
      config.headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    if (config.url === 'refresh') {
      config.headers = {
        'refresh-token': sessionStorage.getItem('refresh_token'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 在 response 拦截器实现

axios.interceptors.response.use(
  response => {
    // 定时刷新access-token
    if (!response.data.value && response.data.data && response.data.data.message === 'token invalid') {
    // 刷新token
      store.dispatch('refresh').then(response => {
        sessionStorage.setItem('access_token', response.data.access_token)
        sessionStorage.setItem('refresh_token', response.data.refresh_token)
      }).catch(error => {
        throw new Error('token刷新' + error)
      })
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/register') {
    store.dispatch('logout')
  }
  let token = sessionStorage.getItem('access_token')
  if (!token && to.meta.requireUser) {
    next({ path: '/login' })
  } else {
    if (token) {
      let curUser = store.state.user
      if (!curUser) {
        let cb = (success) => {
          if (success === true) next()
          else {
            this.$message.error(success)
            next({path: '/login'})
          }
        }
        store.dispatch('getCurrentUser', cb)
      } else next()
    } else next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
