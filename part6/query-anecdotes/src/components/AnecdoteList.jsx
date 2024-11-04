import {useMutation, useQueryClient} from '@tanstack/react-query';
import {updateAnecdote} from '../requests.js';

const AnecdoteList = (data) => {
  const queryClient = useQueryClient();

  const votedAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (votedAnecdote) => {
      const anecdoteList = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdoteList.map(anecdote =>
      anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote))
    }
  })

  const handleVote = (anecdote) => {
    votedAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1});
    console.log('vote')
  }

  return(
      <div>
        {data.anecdotes.map(anecdote =>
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