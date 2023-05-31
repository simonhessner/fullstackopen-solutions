const Header = ({course}) => (
  <h1>{course}</h1>
)

const Part = ({name, exercises}) => (
  <p>{name} {exercises}</p>
)

const Content = (props) => (
  <>
    {props.data.map((data) => <Part name={data[0]} exercises={data[1]} />)}
  </>
)

const Total = ({total}) => (
  <p>Number of exercises {total}</p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content data={[[part1, exercises1], [part2, exercises2], [part3, exercises3]]} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App