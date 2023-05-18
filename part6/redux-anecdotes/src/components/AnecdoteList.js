import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  return (
    <>
      {anecdotes
        .sort((a,b) => b.votes - a.votes)
        .filter(anecdote => anecdote.content.includes(filter))
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
            </div>
          </div>
        )
      }
    </>
  )
}

export default AnecdoteList