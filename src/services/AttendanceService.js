import http from '../common/http'

const getCourseDates = courseId => http.get(`v1/courseDates/getCourseDates/${courseId}`)

const putCourseDates = courseDateId => http.put(`v1/courseDates/${courseDateId}`)

const getAttendanceBook = courseId => http.get(`v1/attendance/getAttendanceBook/${courseId}`)

const putAttendanceBook = attendance => http.put(`v1/attendance/putAttendanceBook`, attendance)

const AttendanceService = {
  putCourseDates,
  getCourseDates,
  getAttendanceBook,
  putAttendanceBook,
}

export default AttendanceService
