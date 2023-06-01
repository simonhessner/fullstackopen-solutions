import { useState } from 'react'

const Button = ({text, clickHandler}) => <button onClick={clickHandler}>{text}</button>

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}:</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  const totalVotes = (good + neutral + bad)
  const average = (good - bad) / totalVotes
  const positiveRatio = good / totalVotes

  if (totalVotes == 0) {
    return <div>Start voting to see statistics</div>
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="Average" value={average} />
          <StatisticLine text="Positive" value={positiveRatio * 100} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button clickHandler={() => setGood(good + 1)} text="good" />
      <Button clickHandler={() => setNeutral(neutral + 1)} text="neutral" />
      <Button clickHandler={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App