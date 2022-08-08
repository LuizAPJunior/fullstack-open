import { createSlice } from '@reduxjs/toolkit'

const initialState = false

const togglableReducer = createSlice({
  name: 'togglable',
  initialState,
  reducers: {
    setTogglable(state, action) {
      return action.payload
    },
  },
})

export const { setTogglable } = togglableReducer.actions

export default togglableReducer.reducer
