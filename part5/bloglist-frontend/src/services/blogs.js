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

const create = async newBlog => {
  const config = { headers: { Authorization: token } }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async updatedBlog => {
  const config = { headers: { Authorization: token } }

  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`,{
    user: updatedBlog.user.id,
    likes: updatedBlog.likes,
    author: updatedBlog.author,
    title: updatedBlog.title,
    url: updatedBlog.url
  }, config)

  return response.data
}

const remove = async blog => {
  const config = { headers: { Authorization: token } }
  await axios.delete(`${baseUrl}/${blog.id}`, config)
}

export default { getAll, create, setToken, update, remove }