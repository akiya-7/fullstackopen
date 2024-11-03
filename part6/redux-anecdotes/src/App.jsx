import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification.jsx';
import AnecdoteForm from './components/AnecdoteForm';
import {initialiseAnecdotes} from './reducers/anecdoteReducer.js';

const App = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(initialiseAnecdotes());
  }, [dispatch])

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