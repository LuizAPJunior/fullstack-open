import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: null, notifError: false }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state = initialState, action) {
      state.message = action.payload
      return state
    },
    removeNotification(state) {
      state.message = null
      return state
    },
    setNotifError(state, action) {
      state.notifError = action.payload
      return state
    },
  },
})

let timeoutId = null
export const setNotification = (message, time, notifError) => {
  return (dispatch) => {
    if (timeoutId) clearTimeout(timeoutId)
    dispatch(setNotifError(notifError))
    dispatch(createNotification(message))
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export const { createNotification, removeNotification, setNotifError } =
  notificationSlice.actions
export default notificationSlice.reducer
