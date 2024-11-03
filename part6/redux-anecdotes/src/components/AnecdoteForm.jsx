import {createAnecdote} from '../reducers/anecdoteReducer.js';
import {useDispatch} from 'react-redux';
import {
  clearNotification, newAnecdoteNotification,} from '../reducers/notificationReducer.js';
const AnecdoteForm = () => {

  const dispatch = useDispatch();

  const handleNewAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.input.value
    event.target.input.value = ''
    dispatch(createAnecdote(content))

    dispatch(newAnecdoteNotification(content))
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