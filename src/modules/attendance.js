import { GET_COURSEDATES, GET_ATTENDANCEBOOK, PUT_COURSEDATES, PUT_ATTENDANCEBOOK } from '../actions/types'

const initialState = []

function attendanceReducer(attendance = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_COURSEDATES:
      return [...payload]

    case GET_ATTENDANCEBOOK:
      return [...payload]

    case PUT_COURSEDATES:
      return [...payload]

    case PUT_ATTENDANCEBOOK:
      return [...payload]

    default:
      return attendance
  }
}

export default attendanceReducer
