import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postBlog = (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}

const likeBlog = (blog) => {
  const request = axios.put(`${baseUrl}/${blog.id}`, blog)
  return request.then(response => response.data)
}

const deleteBlog = (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${blog.id}`, config)
  return request.then(response => response.data)
}

export default { getAll, postBlog, setToken, likeBlog, deleteBlog }