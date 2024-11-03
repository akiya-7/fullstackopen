import {createSlice} from '@reduxjs/toolkit';

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const updatedAnecdote = {...anecdoteToVote, votes: anecdoteToVote.votes + 1}
      return state.map(anecdote => anecdote.id !== id ? anecdote : updatedAnecdote)
    },
    newAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const { vote, newAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer