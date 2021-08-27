import http from '../common/http'

const put = validNum => http.put(`v1/users/test2`, { validNum })

const get = courseId => http.get(`v1/courseDates/${courseId}`)

const patch = info => http.patch(`v1/attendance/attend`, info)

const QrService = {
  put,
  get,
  patch,
}

export default QrService
