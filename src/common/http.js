import axios from 'axios'

export default axios.create({
  baseURL: 'http://3b2f32f2b2a3.ngrok.io',
  headers: {
    'Content-type': 'application/json',
  },
})
