import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = JSON.parse(
  window.localStorage.getItem('loggedBlogappUser')
)

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const loginUser = (user) => {
  return async (dispatch) => {
    const userLogged = await loginService.login(user)
    blogService.setToken(userLogged.token)
    dispatch(setUser(userLogged))
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(userLogged))
  }
}

export const { setUser } = userReducer.actions

export default userReducer.reducer
