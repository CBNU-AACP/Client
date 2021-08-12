import http from '../common/http'

const create = (members, courseId) => http.post(`v1/memberLists/${courseId}`, members)

const update = (members, courseId) => http.put(`v1/memberLists/${courseId}`, members)

const getAll = courseId => http.get(`v1/memberLists/${courseId}`)

const remove = id => http.delete(`v1/courses/single/${id}`)

const removeAll = () => http.delete(`v1/courses/multiple/test12`)

const findByName = name => http.get(`v1/users/test1/${encodeURIComponent(name)}`)

const MemberService = {
  create,
  update,
  getAll,
  remove,
  removeAll,
  findByName,
}

export default MemberService
