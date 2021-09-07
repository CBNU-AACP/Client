import http from '../common/http'

const getAll = userId => http.get(`v1/users/${userId}`)

const findName = (name, userId) => http.get(`v1/users/name/${userId}?value=${encodeURIComponent(name)}`)

const UserService = {
  getAll,
  findName,
}

export default UserService
