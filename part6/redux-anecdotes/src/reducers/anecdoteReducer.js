import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    sortAnecdotes(state) {
      state.sort((a, b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    findAnecdote(state, action) {
      const result = state.find((anecdote) => anecdote.id === action.payload)
      return result
    },
    updateAnecdotes(state, action) {
      return state.map((anecdote) =>
        anecdote.id !== action.payload.id ? anecdote : action.payload
      )
    },
  },
})

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
    dispatch(sortAnecdotes())
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = (anecdote) => {
  return async (dispatch) => {
    const anecdoteToChange = { ...anecdote, votes: anecdote.votes + 1 }
    const changedAnecdote = await anecdoteService.updateVote(
      anecdote.id,
      anecdoteToChange
    )
    dispatch(updateAnecdotes(changedAnecdote))
    dispatch(sortAnecdotes())
  }
}

export const {
  sortAnecdotes,
  setAnecdotes,
  appendAnecdote,
  findAnecdote,
  updateAnecdotes,
} = anecdoteSlice.actions
export default anecdoteSlice.reducer
