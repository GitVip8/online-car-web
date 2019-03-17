import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)
const state = {
  app: '吉林市网约车管理平台',
  user: sessionStorage.getItem('user') || '',
  strict: process.env.NODE_ENV !== 'production',
  isAjaxLoading: true,
  loading: {
    initLoading: false,
    ajaxLoading: false
  },
  menu: {
    tree: [],
    width: '240px',
    collapse: false
  }
}
export default new Vuex.Store({state, actions, mutations})
