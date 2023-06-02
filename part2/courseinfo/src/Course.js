const Header = ({course}) => (
    <h1>{course.name}</h1>
  )
  
  const Part = ({name, exercises}) => (
    <p>{name} {exercises}</p>
  )
  
  const Content = ({course}) => (
    <>
      {course.parts.map((data) => <Part name={data.name} exercises={data.exercises} key={data.id} />)}
    </>
  )
  
  const Total = ({course}) => (
    <b>Total of exercises {course.parts.reduce((a,b) => a+b.exercises, 0)}</b>
  )
  
  const Course = ({course}) => {
    return (
      <div key={course.id}>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }

export default Course