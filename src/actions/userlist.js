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
  } catch (err) {
    console.log(err)
  }
}

export const findUserByName = name => async dispatch => {
    try {
      const res = await UserService.findByName(name)
      console.log(res.data.data)
      dispatch({
        type: RETRIEVE_USERS,
        payload: res.data.data,
      })
    } catch (err) {
      console.log(err)
    }
  }