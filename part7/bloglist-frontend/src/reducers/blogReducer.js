import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      let updatedState = state.concat(action.payload)
      return sort(updatedState)
    },
    updateBlog(state, action) {
      let updatedState = state.map((item) =>
        item.id !== action.payload.id ? item : action.payload
      )
      return sort(updatedState)
    },
    setBlogs(state, action) {
      return sort(action.payload)
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id)
    },
  },
})

const sort = (blogs) => blogs.sort((a, b) => b.likes - a.likes)

export const { addBlog, updateBlog, setBlogs, deleteBlog } = blogSlice.actions

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(addBlog(newBlog))
    dispatch(
      setNotification({
        text: `new blog "${blog.title}" by ${blog.author} added!`,
        type: 'info',
      })
    )
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    const updatedBlog = await blogService.update(likedBlog)
    dispatch(updateBlog(updatedBlog))
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog)
    dispatch(deleteBlog(blog))
  }
}

export default blogSlice.reducer
