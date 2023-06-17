import axios from 'axios'
const baseUrl = '/api/blogs'

let token
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getConfig = () => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  return config
}

const create = async newBlog => {
  const response = await axios.post(baseUrl, newBlog, getConfig())
  return response.data
}

const remove = async id => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return response.data
}

const like = async blog => {
  const newBlog = {
    ...blog,
    likes: blog.likes + 1,
    user: blog.user.id
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, newBlog)
  return response
}

export default { getAll, create, remove, like, setToken }