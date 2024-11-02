import {newAnecdote} from '../reducers/anecdoteReducer.js';
import {useDispatch} from 'react-redux';

const AnecdoteForm = () => {

  const dispatch = useDispatch();

  const handleNewAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.input.value
    event.target.input.value = ''
    dispatch(newAnecdote(anecdote))
  }

  return (
      <div>
        <h2>create new</h2>
        <form onSubmit={handleNewAnecdote}>
          <div><input name="input"/></div>
          <button type={'submit'}>create</button>
        </form>
      </div>
  )
}

export default AnecdoteForm;