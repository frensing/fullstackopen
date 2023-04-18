const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

const initialUsers = [
  {
    username: 'testuser',
    name: 'Tester',
    passwordHash: '$2b$10$2dGXkDRDWRJyFDs2bQSC3uh4oJtpPflrP0cGaFPFaEnfTb9r/4KqK'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    url: 'willremovethissoon',
    author: 'willremovethissoon'
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb
}