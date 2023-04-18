const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


describe('fetching blogs', () => {
  test('4.8 - blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('4.8 - correct amout of blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('4.9 - id is name id and not _id', async () => {
    const blogs = await helper.blogsInDb()

    blogs.forEach(b => {
      expect(b.id).toBeDefined()
    })
  })
})


describe('adding blogs', () => {
  test('4.10 - a valid blog can be added', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://test.com/',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(r => r.title)
    expect(titles).toContain('Test Blog')
  })

  test('4.11 - blog without likes has 0 likes', async () => {
    const newBlog = {
      title: 'Test Blog',
      author: 'Test Author',
      url: 'https://test.com/'
    }

    const blogAdded = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(blogAdded.body.likes).toEqual(0)
  })

  test('4.12 - blog without title is not added', async () => {
    const newBlog = {
      author: 'Test Author',
      url: 'https://test.com/',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('4.12 - blog without url is not added', async () => {
    const newBlog = {
      title: 'Test Title',
      author: 'Test Author',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deleting of blogs', () => {
  test('4.13 - a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('accessing and updating a single blog', () => {
  test('4.14 - a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(resultBlog.body).toEqual(blogToView)
  })

  test('4.14 - fails with statuscode 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  })

  test('4.14 - fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/blogs/${invalidId}`)
      .expect(400)
  })

  test('4.14 - a specific blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const updatedBlog = {
      ...blogToView,
      title: 'New Title'
    }

    const resultBlog = await api
      .put(`/api/blogs/${blogToView.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(resultBlog.body).toEqual(updatedBlog)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})