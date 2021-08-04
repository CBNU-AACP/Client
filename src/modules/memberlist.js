import {
  CREATE_MEMBERLIST,
  RETRIEVE_MEMBERLIST,
  EDIT_MEMBERLIST,
  DELETE_MEMBER,
  DELETE_MEMBERLIST,
} from '../actions/types'

const initialState = []

function memberReducer(list = initialState, action) {
  const { type, memberlist } = action
  console.log(memberlist)

  switch (type) {
    case CREATE_MEMBERLIST:
      return memberlist

    case RETRIEVE_MEMBERLIST:
      return memberlist

    case EDIT_MEMBERLIST:
      return list.map(member => {
        if (member.id === memberlist.id) {
          return {
            ...member,
            ...memberlist,
          }
        }
        return member
      })

    case DELETE_MEMBER:
      return list.filter(({ id }) => id !== memberlist.id)

    case DELETE_MEMBERLIST:
      return []

    default:
      return list
  }
}

export default memberReducer
