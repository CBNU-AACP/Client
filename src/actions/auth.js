import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE } from './types'

import AuthService from '../services/auth/auth_service'

export const RegisterUser = user => async dispatch => {
  try {
    const res = await AuthService.register(user)
    console.log(res)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.data,
    })
    dispatch({
      type: SET_MESSAGE,
      payload: res.data.message,
    })

    return Promise.resolve(res.data.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const DpUsercheck = userId => async dispatch => {
  try {
    const res = await AuthService.Idcheck(userId)
    console.log(res)
    dispatch({
      type: SET_MESSAGE,
      payload: res.data.message,
    })

    return Promise.resolve(res.data.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const login = (userId, password) => async dispatch =>
  AuthService.login(userId, password).then(
    data => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      })
      return Promise.resolve()
    },
    error => {
      const message =
        (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

      dispatch({
        type: LOGIN_FAIL,
      })

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      })

      return Promise.reject()
    },
  )

export const logout = () => dispatch => {
  AuthService.logout()

  dispatch({
    type: LOGOUT,
  })
}
