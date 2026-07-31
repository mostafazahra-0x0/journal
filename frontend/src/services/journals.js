import axios from 'axios'
const baseUrl = '/api/journals'

let token

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getToken = () => {
  return token
}

export default { setToken, getToken }