import axios from 'axios'

const baseUrl = 'api/users'

const getAll = async () => {
  const response = await axios.get(`http://localhost:3000/${baseUrl}`)
  return response.data
}

export default { getAll }
