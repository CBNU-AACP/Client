import authHeader from './auth_header'
import http from '../../common/http'

const getPublicContent = () => http.get(`all`)

const getUserBoard = () => http.get(`user`, { headers: authHeader() })

export default {
  getPublicContent,
  getUserBoard,
}
