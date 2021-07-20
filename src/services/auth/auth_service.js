import http from '../../http'

const register = (userId, userName, email, passWord) =>
  http.post(`signup`, {
    userId,
    userName,
    email,
    passWord,
  })

const login = (userId, passWord) =>
  http
    .post(`signin`, {
      userId,
      passWord,
    })
    .then(response => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data))
      }

      return response.data
    })

const logout = () => {
  localStorage.removeItem('user')
}

export default {
  register,
  login,
  logout,
}
