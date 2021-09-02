import http from '../../common/http'
import { useCookies } from 'react-cookie'

const JWT_EXPIRY_TIME = 24 * 3600 * 1000

const register = user => http.post(`v1/users/register`, user)
const Idcheck = userId => http.get(`v1/users/check/${userId}`)
const login = user => http.post(`v1/users/login`, user)
const logout = () => {
  const [cookies, removeCookie] = useCookies(['userId'])
  removeCookie('userId')
}

const AuthService = {
  register,
  Idcheck,
  login,
  logout,
}

export default AuthService
