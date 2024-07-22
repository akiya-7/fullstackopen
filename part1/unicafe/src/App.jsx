import { useState } from 'react'

const Button = ( { handler, text, value } ) => {
    return (
        <>
            <button onClick={() => handler(value + 1)}>{text}</button>
        </>
    )
}

const StatisticLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ( {good, neutral, bad } ) => {
    let total = good + neutral + bad;
    let average = (good - bad) / total
    let positivePercentage = (good / total) * 100
    if (total === 0)
    {
        return <p>No feedback given</p>
    }
    else
    {
        return (
            <>
                <h1>statistics</h1>
                <table>
                    <StatisticLine text="good" value={good} />
                    <StatisticLine text="neutral" value={neutral} />
                    <StatisticLine text="bad" value={bad} />
                    <StatisticLine text="all" value={total} />
                    <StatisticLine text="average" value={average} />
                    <StatisticLine text="positive" value={positivePercentage + "%"} />
                </table>
                </>
        )
    }
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <>
            <h1>give feedback</h1>
            <Button handler={setGood} value={good} text="Good"></Button>
            <Button handler={setNeutral} value={neutral} text="Neutral"></Button>
            <Button handler={setBad} value={bad} text="Bad"></Button>
            <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
        </>
    )
}

export default App