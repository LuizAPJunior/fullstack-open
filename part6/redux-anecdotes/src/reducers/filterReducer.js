import { createSlice } from "@reduxjs/toolkit"

const initialState = ""

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterMessage(state, action) {
        return action.payload
    },
  },
})

export const { filterMessage } = filterSlice.actions
export default filterSlice.reducer
