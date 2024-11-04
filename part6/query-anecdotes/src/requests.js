import axios from 'axios';

const baseUrl = "http://localhost:3001"

export const getAnecdotes = async () => {
  const anecdotes = await axios.get(`${baseUrl}/anecdotes`);
  return anecdotes.data;
}

export const newAnecdote = async (anecdote) => {
  const newAnecdote = await axios.post(`${baseUrl}/anecdotes`, anecdote)
  return newAnecdote.data
}