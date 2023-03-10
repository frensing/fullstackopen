const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Content = (props) => {
  return props.parts.map((part, index) => <Part part={part} key={index} />)
}

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Total =(props) => {
  let exercises = props.parts.map(a => a.exercises)
  let sum = exercises.reduce((a, b) => a + b, 0)
  return (
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />

      <Content parts={course.parts} />

      <Total parts={course.parts} />
    </div>
  )
}

export default App