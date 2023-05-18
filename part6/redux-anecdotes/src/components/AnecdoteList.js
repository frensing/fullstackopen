import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const onVote = (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'`))
    setTimeout(() => dispatch(setNotification(null)), 5000)
  }

  return (
    <>
      {anecdotes
        .filter(anecdote => anecdote.content.includes(filter))
        .sort((a,b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => onVote(anecdote)}>vote</button>
            </div>
          </div>
        )
      }
    </>
  )
}

export default AnecdoteList