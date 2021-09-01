import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE } from './types'

import AuthService from '../services/auth/auth_service'

// 유저 등록
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

// 중복 확인
export const DpUsercheck = userId => async dispatch => {
  try {
    console.log(userId)
    const res = await AuthService.Idcheck(userId)
    console.log(res.data.success)
    dispatch({
      type: SET_MESSAGE,
      payload: res.data.success,
    })

    return Promise.resolve(res.data.success)
  } catch (err) {
    return Promise.reject(err)
  }
}

// 로그인
export const LoginUser = user => async dispatch => {
  try {
    console.log(user)
    const res = await AuthService.login(user)
    console.log(res)
    // dispatch({
    //   type: LOGIN_SUCCESS,
    //   payload: res.data.data,
    // })
    // dispatch({
    //   type: SET_MESSAGE,
    //   payload: res.data.message,
    // })

    return Promise.resolve(res.data.data)
  } catch (err) {
    return Promise.reject(err)
  }
}

// 로그아웃
export const logout = () => dispatch => {
  AuthService.logout()

  dispatch({
    type: LOGOUT,
  })
}
