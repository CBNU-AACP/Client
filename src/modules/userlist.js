import { RETRIEVE_USERS } from '../actions/types'

const initialState = [{ userId: '', name: '', studentId: '' }]

function userlistReducer(userlist = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case RETRIEVE_USERS:
      return [{ ...userlist, ...payload }]

    default:
      return userlist
  }
}

export default userlistReducer
