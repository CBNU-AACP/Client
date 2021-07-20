import courses from './course'
import auth from './auth'
import message from './message'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth,
  message,
  courses,
})

export default rootReducer
