import { createSlice } from "@reduxjs/toolkit"
import axios from 'axios'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    add(state, action) {
      state.push(action.payload)
    },
    set(state, action) {
      return action.payload
    },
    update(state, action) {
      const id = action.payload.id
      return state.map(anecdote => anecdote.id === id ? action.payload : anecdote)
    }
  }
})

export const { add, set, update } = anecdoteSlice.actions

export const loadAnecdotes = () => {
  return async dispatch => {
    const result = await axios.get('http://localhost:3001/anecdotes')
    dispatch(set(result.data))
  }
}

export const addAnecdote = anecdote => async dispatch => {
  const result = await axios.post('http://localhost:3001/anecdotes', {
    content: anecdote,
    votes: 0
  })
  dispatch(add(result.data))
}

export const voteForAnecdote = anecdote => async dispatch => {
  const id = anecdote.id
  const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
  const result = await axios.put('http://localhost:3001/anecdotes/' + id, newAnecdote)
  console.log(result.data)
  dispatch(update(result.data))
}

export  default anecdoteSlice.reducer