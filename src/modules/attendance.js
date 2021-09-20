import { GET_COURSEDATES, GET_ATTENDANCEBOOK, PUT_COURSEDATES } from '../actions/types'

const courseState = []
const attendanceState = []

export function courseDates(courseDates = courseState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_COURSEDATES:
      return [...payload]

    case PUT_COURSEDATES:
      return [...payload]

    default:
      return courseDates
  }
}

export function attendanceBook(attendanceBook = attendanceState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_ATTENDANCEBOOK:
      return [...payload]

    default:
      return attendanceBook
  }
}
