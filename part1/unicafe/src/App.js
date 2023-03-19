import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const values = [good, neutral, bad]
  const handlers = [setGood, setNeutral, setBad]


  return (
    <div>
      <h1>Give Feedback!</h1>
      <Feedback handlers={handlers} values={values} />
      <h2>Statistics</h2>
      <Statistics values={values}/>
    </div>
  )
}

const Feedback = ({handlers, values}) => {
  const clkHandler = (i) => () => handlers[i](values[i] + 1)
  return (
    <>
      <Btn handler={clkHandler(0)} text="good" />
      <Btn handler={clkHandler(1)} text="neutral" />
      <Btn handler={clkHandler(2)} text="bad" />
    </>
  )
}

const Btn = ({handler, text}) => <button onClick={handler}>{text}</button>

const Statistics = ({values}) => {
  let good = values[0]
  let rest = values[1] + values[2]
  let all = good + rest
  let avg = (good + (values[2]*(-1))) / all
  let pos = "" + (good / all * 100) + "%"

  if (all === 0) {
    return <p>No feedback given</p>
  } 

  return (
    <table>
      <tbody>
        <StatisticLine text="good"     value={values[0]} />
        <StatisticLine text="good"     value={values[0]} />
        <StatisticLine text="neutral"  value={values[1]} />
        <StatisticLine text="bad"      value={values[2]} />
        <StatisticLine text="all"      value={all}       />
        <StatisticLine text="average"  value={avg}       />
        <StatisticLine text="positive" value={pos}       />
      </tbody>
    </table>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr> 
      <td>{text}</td>
      <td>{value}</td> 
    </tr>
  )
}

export default App