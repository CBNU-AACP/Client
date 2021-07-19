import { CREATE_COURSE, RETRIEVE_COURSES, UPDATE_COURSE, DELETE_COURSE, DELETE_ALL_COURSES } from './types'

import CourseDataService from '../services/CourseService'

export const createCourse = (name, description) => async dispatch => {
  try {
    const res = await CourseDataService.create({ name, description })
    console.log(res.data)
    dispatch({
      type: CREATE_COURSE,
      payload: res.data,
    })

    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const retrieveCourses = () => async dispatch => {
  try {
    const res = await CourseDataService.getAll()
    console.log(res.data)
    dispatch({
      type: RETRIEVE_COURSES,
      payload: res.data,
    })
  } catch (err) {
    console.log(err)
  }
}

export const updateCourse = (id, data) => async dispatch => {
  try {
    const res = await CourseDataService.update(id, data)
    console.log(res.data)
    dispatch({
      type: UPDATE_COURSE,
      payload: data,
    })

    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteCourse = id => async dispatch => {
  try {
    await CourseDataService.remove(id)
    dispatch({
      type: DELETE_COURSE,
      payload: { id },
    })
  } catch (err) {
    console.log(err)
  }
}

export const deleteAllCourses = () => async dispatch => {
  try {
    const res = await CourseDataService.removeAll()
    console.log(res.data)
    dispatch({
      type: DELETE_ALL_COURSES,
      payload: res.data,
    })

    return Promise.resolve(res.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const findCoursesByName = name => async dispatch => {
  try {
    const res = await CourseDataService.findByName(name)
    console.log(res.data)
    dispatch({
      type: RETRIEVE_COURSES,
      payload: res.data,
    })
  } catch (err) {
    console.log(err)
  }
}
