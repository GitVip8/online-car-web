import { COLLAPSE, LOGOUT, LOGIN, CURRENT_USER, REFRESH } from './mutation-type'
export default {
  login ({commit}, payload) {
    commit(LOGIN, payload)
  },
  logout ({ commit }) {
    commit(LOGOUT)
  },
  doCollapse ({ commit }) {
    commit(COLLAPSE)
  },
  getCurrentUser ({commit}, cb) {
    commit(CURRENT_USER, cb)
  },
  refresh ({commit}, payload) {
    commit(REFRESH, payload)
  }
}
