import http from '../common/http'

const getAll = userId => http.get(`v1/courses/multiple/${userId}`)

const get = id => http.get(`v1/courses/single/${id}`)

const create = (data, userId) => http.post(`v1/courses/${userId}`, data)

const update = (id, data) => http.put(`v1/courses/${id}`, data)

const remove = id => http.delete(`v1/courses/single/${id}`)

const removeAll = userId => http.delete(`v1/courses/multiple/${userId}`)

const findByName = (name, userId) => http.get(`v1/courses/search/${userId}?value=${encodeURIComponent(name)}`)

const CourseService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
}

export default CourseService
