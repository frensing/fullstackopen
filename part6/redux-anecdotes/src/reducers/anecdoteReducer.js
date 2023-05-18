import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newAnecdote(state, action) {
      state.push(action.payload)
    },
    vote(state, action) {
      return state.map(item => item.id !== action.payload ? item : {
        ...item,
        votes: item.votes + 1
      })
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { newAnecdote, vote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer