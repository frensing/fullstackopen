import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      return null
    },
  },
})

export const initUser = () => {
  return (dispatch) => {
    const userInStorage = window.localStorage.getItem('user')
    if (userInStorage) {
      const user = JSON.parse(userInStorage)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))
      dispatch(setUser(user))
      dispatch(
        setNotification({
          text: 'Successfully logged in!',
          type: 'info',
        })
      )
      return true
    } catch (exception) {
      dispatch(
        setNotification({
          text: 'Wrong credentials',
          type: 'error',
        })
      )
      return false
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.clear()
    blogService.setToken(null)
    dispatch(clearUser())
    dispatch(
      setNotification({
        text: 'Successfully logged out!',
        type: 'info',
      })
    )
  }
}

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
