import { CREATE_MEMBERLIST, RETRIEVE_MEMBERLIST, EDIT_MEMBERLIST, DELETE_MEMBER, DELETE_MEMBERLIST } from './types'

import MemberService from '../services/MemberService'

export const createMemberlist = (members, courseId) => async dispatch => {
  console.log({ members }, courseId)
  try {
    const res = await MemberService.create({ members }, courseId)
    console.log(res.data.data)
    dispatch({
      type: CREATE_MEMBERLIST,
      payload: res.data.data,
    })
    return Promise.resolve(res.data.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const retrieveMemberlist = () => async dispatch => {
  try {
    const res = await MemberService.getAll()
    console.log(res.data.data)
    dispatch({
      type: RETRIEVE_MEMBERLIST,
      payload: res.data.data.member,
    })
  } catch (err) {
    console.log(err)
  }
}

export const editMemberlist = member => async dispatch => {
  try {
    const res = await MemberService.update(member)
    console.log(res.data.data)
    dispatch({
      type: EDIT_MEMBERLIST,
      member,
    })
    console.log(Promise.resolve(res.data.data))
    return Promise.resolve(res.data.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deleteMember = id => async dispatch => {
  try {
    await MemberService.remove(id)
    dispatch({
      type: DELETE_MEMBER,
      member: { id },
    })
  } catch (err) {
    console.log(err)
  }
}

export const deleteMemberlist = () => async dispatch => {
  try {
    const res = await MemberService.removeAll()
    console.log(res.data.data)
    dispatch({
      type: DELETE_MEMBERLIST,
      payload: res.data.data.member,
    })

    return Promise.resolve(res.data.data)
  } catch (err) {
    return Promise.reject(err)
  }
}
