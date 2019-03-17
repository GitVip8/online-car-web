import { COLLAPSE, LOADING, LOGIN, LOGOUT, CURRENT_USER, REFRESH } from './mutation-type'
import { doLogin, getCurrentUser } from '@/api/pub'
export default {
  [COLLAPSE] (state) {
    state.menu.collapse = !state.menu.collapse
    if (!state.menu.width) state.menu.width = '240px'
    else state.menu.width = ''
  },
  [LOADING] (state) {
    state.loading.initLoading = !state.loading.initLoading
  },
  [LOGIN] (state, {payload}) {
    let {user, callback} = payload
    doLogin(user).then(res => callback(res))
  },
  [LOGOUT] (state) {
    sessionStorage.removeItem('access_token')
    sessionStorage.removeItem('refresh_token')
    state.user = null
    // doLogout()
  },
  [CURRENT_USER] (state, payload) {
    getCurrentUser().then(res => {
      if (res.data.code === 0) {
        state.user = res.data.data
        payload(true)
      } else payload(res.data.message)
    })
  },
  [REFRESH] (state, payload) {
  }
}
