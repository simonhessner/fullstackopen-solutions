import { createSlice } from "@reduxjs/toolkit"

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteFor(state, action) {
      const anecdote = state.find(anecdote => anecdote.id === action.payload)
      anecdote.votes += 1
    },
    add(state, action) {
      state.push(action.payload)
    },
    set(state, action) {
      return action.payload
    }
  }
})

export const { voteFor, add, set } = anecdoteSlice.actions
export  default anecdoteSlice.reducer