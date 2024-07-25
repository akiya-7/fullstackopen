import {useState} from 'react'
const uninitialized = -1

const Anecdote = ( {anecdotes, votes, index, children} ) => {
    if (index === uninitialized){return null}

    return (
        <>
            <h1>{children}</h1>
            <p>{anecdotes[index]}</p>
            <p>has {votes[index]} votes</p>
        </>
    )
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0)
    const [anecdoteVotes, setAnecdoteVotes] = useState(Array(anecdotes.length).fill(0))
    const [mostVotesIndex, setMostVotesIndex] = useState(uninitialized)

    function changeAnecdote(){
        console.log("ANECDOTE CHANGE--")
        const index = Math.floor((Math.random() * anecdotes.length))
        setSelected(index)
    }

    function increaseVote() {
        console.log("vote for index", selected, "is now", anecdoteVotes[selected]+1);
        const newVotes = [...anecdoteVotes];
        newVotes[selected] += 1;
        setAnecdoteVotes(newVotes)
        checkMostVote(newVotes)
    }

    function checkMostVote(votes) {

        if (mostVotesIndex === uninitialized) {
            console.log("MOST VOTE SET--", "Most Votes Index:", mostVotesIndex)
            setMostVotesIndex(selected)
        }
        else {
            if (votes[selected] > votes[mostVotesIndex]) {
                setMostVotesIndex(selected)
                console.log("NEW MOST--","Most Votes Index:", mostVotesIndex)
            }
        }
    }

    return (
        <>
            <div>
                <Anecdote anecdotes={anecdotes} votes={anecdoteVotes} index={selected}>Anecdote of the Day</Anecdote>
                <button onClick={increaseVote}>vote</button>
                <button onClick={changeAnecdote}>next anecdote</button>
                <Anecdote anecdotes={anecdotes} votes={anecdoteVotes} index={mostVotesIndex}>Anecdote with most votes</Anecdote>
            </div>
        </>

    )
}

export default App