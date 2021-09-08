import { GET_COURSEDATES, GET_ATTENDANCEBOOK, PUT_COURSEDATES, PUT_ATTENDANCEBOOK } from './types'

import AttendanceService from '../services/AttendanceService'

export const getCourseDates = courseId => async dispatch => {
  try {
    const res = await AttendanceService.getCourseDates(courseId)
    console.log(res.data.data)
    dispatch({
      type: GET_COURSEDATES,
      payload: res.data.data,
    })
    return Promise.resolve(res.data.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getAttendanceBook = courseId => async dispatch => {
  try {
    const res = await AttendanceService.getAttendanceBook(courseId)
    console.log(res.data.data)
    dispatch({
      type: GET_ATTENDANCEBOOK,
      payload: res.data.data,
    })
    return Promise.resolve(res.data.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const putCourseDates = courseDateId => async dispatch => {
  try {
    const res = await AttendanceService.putCourseDates(courseDateId)
    console.log(res.data.data)
    dispatch({
      type: PUT_COURSEDATES,
      payload: res.data.data,
    })
    return Promise.resolve(res.data.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const putAttendanceBook = courseDateId => async dispatch => {
  try {
    const res = await AttendanceService.put(courseDateId)
    dispatch({
      type: PUT_ATTENDANCEBOOK,
      payload: res.data.data,
    })
    return Promise.resolve(res.data.data)
  } catch (err) {
    return Promise.reject(err)
  }
}
