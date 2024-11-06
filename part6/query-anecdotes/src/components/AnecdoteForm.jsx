import {useMutation, useQueryClient} from '@tanstack/react-query';
import {newAnecdote} from '../requests.js';
import {useNotificationDispatch} from '../context/notificationContext.jsx';

const AnecdoteForm = () => {

  const notificationDispatch = useNotificationDispatch();

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation({
    mutationFn: newAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdoteList = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdoteList.concat(newAnecdote))
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: `'${newAnecdote.content}' has been added`
      })
      setTimeout(() => {
        notificationDispatch({type: "RESET_NOTIFICATION"})
      }, 5000)
    },
    onError: error => {
      notificationDispatch({type: "SET_NOTIFICATION", payload: error.response.data.error})
      setTimeout(() => {
        notificationDispatch({type: "RESET_NOTIFICATION"})
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content: content, votes: 0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
