import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/types'

// const [cookies, getCookie] = useCookies(['user'])
// const user = JSON.parse(getCookie('user'))
const initialState = { isLoggedIn: false, user: null }

export default function (state = initialState, action) {
  const { type, payload } = action
  console.log(type, payload)

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      }
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload,
      }
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      }
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      }
    default:
      return state
  }
}
