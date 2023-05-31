const Hello = ({name, test}) => {
  return (<div>
    <p>Hello {name} {test}!</p>
  </div>)
}

const App = () => {
  const now = new Date()
  const a = 10
  const b = 20
  console.log(now, a+b)

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Harrito" test="hi" />
      <Hello name="Bonnita" />
      <p>
        {['test', 'test']}
      </p>
    </>
  )
}

export default App;
