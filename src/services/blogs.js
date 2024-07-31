import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return await request.data
}

const newBlog = async (newBlog, user) => {
  const request = await axios
    .post(baseUrl, newBlog, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
  return await request.data
}

const updateBlog = async (id, blog) => {
  const request = await axios
    .put(`${ baseUrl }/${ id }`, { ...blog, user: blog.user.id })
  return await request.data
}

export default {
  getAll,
  newBlog,
  updateBlog
}