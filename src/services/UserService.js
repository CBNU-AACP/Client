import http from '../common/http'

const getAll = () => http.get(`v1/users`)

const findByName = name => http.get(`v1/users/test1/${encodeURIComponent(name)}`)

const MemberService = {
  getAll,
  findByName,
}

export default MemberService
