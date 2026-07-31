import axios from 'axios'
const baseUrl = '/api/journals'

let token

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getToken = () => {
  return token
}

const getAll = () => {
  const config = {
    headers: { Authorization: getToken() }
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

export default { setToken, getToken, getAll }