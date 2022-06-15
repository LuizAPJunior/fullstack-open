import { useState } from 'react'

const Button = (props) => {
  const { handleClick, text } = props
  return (
    <button onClick={handleClick}> {text} </button>
  );

}

const Statistics = (props) => {

  const { good, neutral, bad } = props.feedback

  if (good + neutral + bad === 0)
    return (
      <p>No feedback given.</p>
    )

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" count={good} />
          <StatisticLine text="neutral" count={neutral} />
          <StatisticLine text="bad" count={bad} />
          <StatisticLine text="all" count={good + neutral + bad} />
          <StatisticLine text="average" count={((good - bad) / (good + neutral + bad)).toFixed(1)} />
          <StatisticLine text="positive" count={((good / (good + neutral + bad)) * 100).toFixed(1) + "%"} />
        </tbody>
      </table>
    </div>
  )

}

const StatisticLine = (props) => {
  const { text, count } = props
  return (
    <>
      <tr>
        <td>{text} </td>
        <td>{count}</td>
      </tr>
    </>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <h1>statistics</h1>
      <Statistics feedback={{ good, neutral, bad }} />
    </div>
  )
}

export default App