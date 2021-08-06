import http from '../common/http'

const create = (members, courseId) => http.post(`v1/memberLists/${courseId}`, members)

const update = (members, courseId) => http.put(`v1/memberLists/${courseId}`, members)

const remove = id => http.delete(`v1/courses/single/${id}`)

const removeAll = () => http.delete(`v1/courses/multiple/test12`)

const MemberService = {
  create,
  update,
  remove,
  removeAll,
}

export default MemberService
