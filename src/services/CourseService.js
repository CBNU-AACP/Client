import http from '../http-common'

const getAll = () => http.get('v1/courses/multiple/test12')

const get = id => http.get(`v1/courses/single/${id}`)

const create = data => http.post('v1/courses/test12', data)

const update = (id, data) => http.put(`v1/courses/${id}`, data)

const remove = id => http.delete(`v1/courses/single/${id}`)

const removeAll = () => http.delete(`v1/courses/multiple/test12`)

const findByName = name => http.get(`v1/courses/search/test12?value=${encodeURIComponent(name)}`)

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
