import { RETRIEVE_USERS } from './types'

import UserService from '../services/UserService'

export const retrieveUsers = () => async dispatch => {
  try {
    const res = await UserService.getAll()
    console.log(res.data.data)
    dispatch({
      type: RETRIEVE_USERS,
      payload: res.data.data,
    })
    return Promise.resolve(res.data.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const findUserByName = name => async dispatch => {
  try {
    const res = await UserService.findName(name)
    console.log(res.data.data)
    dispatch({
      type: RETRIEVE_USERS,
      payload: res.data.data,
    })
    return Promise.resolve(res.data.data)
  } catch (err) {
    return Promise.reject(err)
  }
}
