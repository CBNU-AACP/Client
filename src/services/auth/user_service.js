import authHeader from './auth_header'
import http from '../../http'

const getPublicContent = () => http.get(`${http}all`)

const getUserBoard = () => http.get(`${http}user`, { headers: authHeader() })

export default {
  getPublicContent,
  getUserBoard,
}
