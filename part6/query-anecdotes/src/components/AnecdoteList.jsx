import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateAnecdote} from '../requests.js';

const AnecdoteList = () => {
  const queryClient = useQueryClient();
  const anecdotes = queryClient.getQueryData(['anecdotes'])

  const votedAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (votedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueriesData(['anecdotes'], anecdotes.map(anecdote =>
      anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote))
    }
  })

  const handleVote = (anecdote) => {
    votedAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1});
    console.log('vote')
  }

  return(
      <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
            {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </div>
        )}
      </div>
  )
}

export default AnecdoteList