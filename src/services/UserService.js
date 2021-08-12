import http from '../common/http'

const getAll = () => http.get(`v1/users`)

const findName = name => http.get(`v1/users/name/${encodeURIComponent(name)}`)

const UserService = {
  getAll,
  findName,
}

export default UserService
