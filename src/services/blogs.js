import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = await axios
    .get(baseUrl)
  return await request.data
}

export default {
  getAll
}