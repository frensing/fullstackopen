import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const likeFn = jest.fn()
  const removeFn = jest.fn()

  const blog = {
    title: 'Blog Title',
    author: 'Blog Author',
    url: 'blog.test',
    likes: 3,
    user: {
      name: 'user name',
      username: 'username'
    }
  }

  const { container } = render(<Blog blog={blog} like={likeFn} removeBlog={removeFn} />)

  const titleElement = container.querySelector('.blogTitle')
  expect(titleElement).toBeDefined()

  screen.debug()

  const urlElement = container.querySelector('.blogUrl')
  expect(urlElement).toBeNull()
  const likesElement = container.querySelector('.blogLikes')
  expect(likesElement).toBeNull()
  const userElement = container.querySelector('.blogUser')
  expect(userElement).toBeNull()
})