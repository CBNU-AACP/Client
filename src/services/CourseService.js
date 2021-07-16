import http from '../http-common'

const getAll = () => http.get('/Courses')

const get = id => http.get(`/Courses/${id}`)

const create = data => http.post('/Courses', data)

const update = (id, data) => http.put(`/Courses/${id}`, data)

const remove = id => http.delete(`/Courses/${id}`)

const removeAll = () => http.delete(`/Courses`)

const findByTitle = title => http.get(`/Courses?title=${title}`)

const CourseService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
}

export default CourseService
