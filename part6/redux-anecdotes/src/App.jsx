import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification.jsx';
import AnecdoteForm from './components/AnecdoteForm';
import anecdoteService from './services/anecdotes';
import {setAnecdotes} from './reducers/anecdoteReducer.js';


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)));
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App