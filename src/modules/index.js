import courses from './course'
import auth from './auth'
import message from './message'
import memberlist from './memberlist'
import userlist from './userlist'
import attendance from './attendance'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth,
  message,
  courses,
  memberlist,
  userlist,
  attendance,
})

export default rootReducer
