import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import E404 from '@/components/E404'
import E403 from '@/components/E403'
import E500 from '@/components/E500'
import MenuInfo from './menu'

Vue.use(Router)

export default new Router({
  routes: [
    ...MenuInfo,
    {
      path: '/login',
      name: '登录',
      component: Login,
      hide: true
    },
    {
      path: '/404',
      name: '404',
      component: E404,
      hide: true
    },
    {
      path: '/403',
      name: '403',
      component: E403,
      hide: true
    },
    {
      path: '/500',
      name: '500',
      component: E500,
      hide: true
    },
    {
      path: '/*',
      name: 'NOT FOUND',
      component: E404,
      hide: true
    }
  ]
})
