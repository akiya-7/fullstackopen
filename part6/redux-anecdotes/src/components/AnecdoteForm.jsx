import {newAnecdote} from '../reducers/anecdoteReducer.js';
import {useDispatch} from 'react-redux';
import {
  clearNotification, newAnecdoteNotification,} from '../reducers/notificationReducer.js';
import anecdoteService from '../services/anecdotes.js'
const AnecdoteForm = () => {

  const dispatch = useDispatch();

  const handleNewAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.input.value
    event.target.input.value = ''
    const response = await anecdoteService.createNew(content)
    dispatch(newAnecdote(response))
    dispatch(newAnecdoteNotification(response))
    setTimeout(() => dispatch(clearNotification()), 5000)
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