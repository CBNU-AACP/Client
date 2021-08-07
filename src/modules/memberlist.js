import {
  CREATE_MEMBERLIST,
  RETRIEVE_MEMBERLIST,
  EDIT_MEMBERLIST,
  DELETE_MEMBER,
  DELETE_MEMBERLIST,
} from '../actions/types'

const initialState = [{ courseId: '', members: [] }]

function memberReducer(memberlist = initialState, action) {
  const { type, courseId, payload } = action

  switch (type) {
    case CREATE_MEMBERLIST:
      return [...memberlist, { courseId, members: [...payload] }]

    case RETRIEVE_MEMBERLIST:
      return memberlist

    case EDIT_MEMBERLIST:
      return memberlist.map(member => {
        if (member.id === memberlist.id) {
          return {
            ...member,
            ...payload,
          }
        }
        return member
      })

    case DELETE_MEMBER:
      return memberlist.filter(({ id }) => id !== memberlist.id)

    case DELETE_MEMBERLIST:
      return []

    default:
      return memberlist
  }
}

export default memberReducer
