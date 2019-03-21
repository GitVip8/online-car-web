import {fetch} from './fetch'
import qs from 'qs'
// 登录
export const doLogin = ({username, password}) => fetch(
  {
    url: '/oauth/token',
    method: 'POST',
    data: qs.stringify({
      username: username,
      password: password,
      client_id: 'client_cspt_web',
      client_secret: 'P@ssw0rd.',
      grant_type: 'password'
    })
  }, 'application/x-www-form-urlencoded'
)
// 登出
export const doLogout = () => fetch(
  {
    url: '/api/logout',
    method: 'post'
  }
)
// 获取当前用户
export const getCurrentUser = () => fetch(
  {
    url: '/api/user/current',
    method: 'get'
  }
)

export const findCompany = () => fetch(
  {
    url: '/car/company/list',
    method: 'get'
  }
)
