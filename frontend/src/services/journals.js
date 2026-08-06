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

const create = (content) => {
  const config = {
    headers: { Authorization: getToken() }
  }
  const request = axios.post(baseUrl, { content }, config)
  return request.then(response => response.data)
}

const update = (id, content) => {
  const config = {
    headers: { Authorization: getToken() }
  }
  const request = axios.put(`${baseUrl}/${id}`, { content }, config)
  return request.then(response => response.data)
}

export default { setToken, getToken, getAll, create, update }