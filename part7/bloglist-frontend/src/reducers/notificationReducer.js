import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setContent(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    },
  },
})

export const { setContent, clearNotification } = notificationSlice.actions

export const setNotification = (content) => {
  return async (dispatch) => {
    dispatch(setContent(content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer
