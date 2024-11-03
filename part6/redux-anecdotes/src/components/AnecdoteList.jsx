import {useDispatch, useSelector} from 'react-redux';
import {vote} from '../reducers/anecdoteReducer.js';
import {displayNotification} from '../reducers/notificationReducer.js';

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase()));
  })
  const dispatch = useDispatch();

  return (
     <>
       {[...anecdotes]
       .sort((a,b) => b.votes - a.votes)
       .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              dispatch(vote(anecdote))
              dispatch(displayNotification(`you voted for '${anecdote.content}'`, 5))
            }}>vote</button>
          </div>
        </div>
       )}
     </>
 )
}

export default AnecdoteList