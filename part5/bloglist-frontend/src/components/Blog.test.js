import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
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

  test('renders content', () => {
    const likeFn = jest.fn()
    const removeFn = jest.fn()

    const { container } = render(<Blog blog={blog} like={likeFn} removeBlog={removeFn} />)

    const titleElement = container.querySelector('.blogTitle')
    expect(titleElement).toBeDefined()

    const urlElement = container.querySelector('.blogUrl')
    expect(urlElement).toBeNull()
    const likesElement = container.querySelector('.blogLikes')
    expect(likesElement).toBeNull()
    const userElement = container.querySelector('.blogUser')
    expect(userElement).toBeNull()
  })

  test('renders details after click', async () => {
    const likeFn = jest.fn()
    const removeFn = jest.fn()

    const { container } = render(<Blog blog={blog} like={likeFn} removeBlog={removeFn} />)

    const user = userEvent.setup()
    const btn = container.querySelector('.blogDetailsBtn')
    await user.click(btn)

    const urlElement = container.querySelector('.blogUrl')
    expect(urlElement).toBeDefined()
    const likesElement = container.querySelector('.blogLikes')
    expect(likesElement).toBeDefined()
    const userElement = container.querySelector('.blogUser')
    expect(userElement).toBeDefined()
  })

  test('like click-handler is called twice', async () => {
    const likeFn = jest.fn()
    const removeFn = jest.fn()

    const { container } = render(<Blog blog={blog} like={likeFn} removeBlog={removeFn} />)

    const user = userEvent.setup()
    const detailsBtn = container.querySelector('.blogDetailsBtn')
    await user.click(detailsBtn)

    const likeBtn = container.querySelector('.blogLikeBtn')
    await user.click(likeBtn)
    await user.click(likeBtn)

    expect(likeFn.mock.calls).toHaveLength(2)
  })
})