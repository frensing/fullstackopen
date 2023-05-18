import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setText(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return null
    }
  }
})

export const setNotification = (text, duration) => {
  return async dispatch => {
    dispatch(setText(text))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 1000 * duration)
  }
}

export const { setText, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer