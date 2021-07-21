import http from '../../http'
import { useCookies } from 'react-cookie'

const JWT_EXPIRY_TIME = 24 * 3600 * 1000
const [cookies, setCookie, removeCookie] = useCookies(['user'])

const register = (userId, userName, email, passWord) =>
  http.post(`signup`, {
    userId,
    userName,
    email,
    passWord,
  })

const login = (userId, passWord) => {
  http
    .post(`signin`, {
      userId,
      passWord,
    })
    .then(response => {
      if (response.data.accessToken) {
        // localStorage.setItem('user', JSON.stringify(response.data))
        setCookie('user', JSON.stringify(response.data), JWT_EXPIRY_TIME)
      }

      return response.data
    })
}
const logout = () => {
  removeCookie('user')
}

export default {
  register,
  login,
  logout,
}
