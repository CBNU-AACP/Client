import {
  CREATE_COURSE,
  RETRIEVE_COURSES,
  UPDATE_COURSE,
  DELETE_COURSE,
  DELETE_ALL_COURSES,
} from '../actions/ActionTypes'

const initialState = []

function courseReducer(courses = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case CREATE_COURSE:
      return [...courses, payload]

    case RETRIEVE_COURSES:
      return payload

    case UPDATE_COURSE:
      return courses.map(course => {
        if (course.id === payload.id) {
          return {
            ...course,
            ...payload,
          }
        }
        return course
      })

    case DELETE_COURSE:
      return courses.filter(({ id }) => id !== payload.id)

    case DELETE_ALL_COURSES:
      return []

    default:
      return courses
  }
}

export default courseReducer
