import http from '../common/http'

const create = (members, courseId) => http.post(`v1/memberLists/${courseId}`, members)

const update = (members, courseId) => http.put(`v1/memberLists/${courseId}`, members)

const getAll = courseId => http.get(`v1/memberLists/${courseId}`)

const remove = (courseId, userId) => http.delete(`v1/memberLists/${courseId}?userId=${userId}`)

const removeAll = userId => http.delete(`v1/courses/multiple/${userId}`)

const MemberService = {
  create,
  update,
  getAll,
  remove,
  removeAll,
}

export default MemberService
