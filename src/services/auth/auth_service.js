import http from '../../common/http'
import { useCookies } from 'react-cookie'

const JWT_EXPIRY_TIME = 24 * 3600 * 1000


const register = (userId, userName, memberId, email, passWord) =>
  http.post(`signup`, {
    userId,
    userName,
    memberId,
    email,
    passWord,
  })
  .then(response=>{
    window.alert(response.data.result);
  })
  .catch((error) => {
    console.log(error);
  });

const login = (userId, passWord) => {
  http
    .post(`signin`, {
      userId,
      passWord,
    })
    .then(response => {
      if (response.data.accessToken) {
        const [setCookie] = useCookies(['user'])
        // localStorage.setItem('user', JSON.stringify(response.data))
        setCookie('user', JSON.stringify(response.data), JWT_EXPIRY_TIME)
      }

      return response.data
    })
}
const logout = () => {
  const [removeCookie] = useCookies(['user'])
  removeCookie('user')
}

export default {
  register,
  login,
  logout,
}
