import http from '../../common/http'
import { useCookies } from 'react-cookie'

const JWT_EXPIRY_TIME = 24 * 3600 * 1000

const register = user => http.post(`v1/users/register`, user)
const Idcheck = userId => http.get(`v1/users/check/${userId}`)
const login = user => http.post(`v1/users/login`, user)

const logout = () => {
  const [removeCookie] = useCookies(['user'])
  removeCookie('user')
}

const AuthService = {
  register,
  Idcheck,
  login,
  logout,
}

export default AuthService

// 로그인
// .then(response => {
//   if (response.data.accessToken) {
//     const [setCookie] = useCookies(['user'])
//     // localStorage.setItem('user', JSON.stringify(response.data))
//     setCookie('user', JSON.stringify(response.data), JWT_EXPIRY_TIME)
//   }

//   return response.data
// })
