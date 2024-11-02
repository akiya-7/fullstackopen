import { useSelector, useDispatch } from 'react-redux'
import { vote, newAnecdote } from './reducers/anecdoteReducer.js'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const handleNewAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.input.value
    event.target.input.value = ''
    dispatch(newAnecdote(anecdote))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a,b) => b.votes - a.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={handleNewAnecdote}>
        <div><input name="input" /></div>
        <button type={'submit'}>create</button>
      </form>
    </div>
  )
}

export default App