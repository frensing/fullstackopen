import { useSelector, useDispatch } from "react-redux"
import { createGood, createOk, createBad, reset } from "./reducers/reducer"

const App = () => {
  const dispatch = useDispatch()
  const feedback = useSelector(state => state)

  return (
    <div>
      <button onClick={() => dispatch(createGood())}>good</button> 
      <button onClick={() => dispatch(createOk())}>ok</button> 
      <button onClick={() => dispatch(createBad())}>bad</button>
      <button onClick={() => dispatch(reset())}>reset stats</button>
      <div>good {feedback.good}</div>
      <div>ok {feedback.ok}</div>
      <div>bad {feedback.bad}</div>
    </div>
  )
}

export default App