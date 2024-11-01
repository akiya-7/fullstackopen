import axios from 'axios'
const baseUrl = '/api/login'

const login = async (loginDetails) => {
  try {
    const tokenRequest = await axios.post(`${baseUrl}`, loginDetails)
    return tokenRequest.data

  }
  catch (error) {
    return error.response.data
  }
}

export default { login }