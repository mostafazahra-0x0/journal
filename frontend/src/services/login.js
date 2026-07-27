import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  const user = {
    username: response.data.username,
    token: response.data.token,
    name: response.data.name,
  }
  return user
}
export default { login }