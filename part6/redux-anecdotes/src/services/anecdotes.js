import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createNew = async (anecdote) => {
  const newAnecdote = {content: anecdote, votes: 0}
  const response = await axios.post(baseURL, newAnecdote)
  return response.data
}

const voteAnecdote = async (anecdote) => {
  const newAnecdote = {...anecdote, votes: anecdote.votes + 1}
  const response = await axios.put(`${baseURL}/${anecdote.id}`, newAnecdote)
  return response.data
}

export default { getAll, createNew, voteAnecdote }