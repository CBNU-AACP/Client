import { useCookies } from 'react-cookie'

export default function authHeader() {
  const [cookies, getCookie] = useCookies(['user'])
  const user = JSON.parse(getCookie('user'))

  if (user && user.accessToken) {
    return { Authorization: `Bearer${user.accessToken}` }
  }
  return {}
}
