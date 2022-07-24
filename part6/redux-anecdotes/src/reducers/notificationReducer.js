import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state = initialState, action) {
      state = action.payload
      return state
    },
    removeNotification(state, action) {
      return (state = null)
    },
  },
})

let timeoutId = null
export const setNotification = (message, time) => {
  return (dispatch) => {
    if(timeoutId) clearTimeout(timeoutId)
    dispatch(createNotification(message))
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export const { createNotification, removeNotification } =
  notificationSlice.actions
export default notificationSlice.reducer
