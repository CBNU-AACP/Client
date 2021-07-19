import axios from 'axios'

export default axios.create({
  baseURL: 'http://802c898b4ed7.ngrok.io/',
  headers: {
    'Content-type': 'application/json',
  },
})
