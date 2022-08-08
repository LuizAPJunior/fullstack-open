import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    sortBlogs(state) {
      state.sort((a, b) => b.likes - a.likes)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlogs(state, action) {
      return state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      )
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload.id)
    },
    appendComment(state, action) {
      return state.map((blog) =>
        action.payload.id
          ? { ...blog, comments: blog.comments.concat(action.payload.comment) }
          : blog
      )
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
    dispatch(sortBlogs())
  }
}

export const createBlog = (blogObj) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObj)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const returnedBlog = await blogService.update(updatedBlog.id, updatedBlog)
    dispatch(updateBlogs(returnedBlog))
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog.id)
    dispatch(removeBlog(blog))
    dispatch(sortBlogs())
  }
}

export const createComment = (text, id) => {
  return async (dispatch) => {
    const comment = await blogService.createComment(text, id)
    //const blogs = await blogService.getAll()
    dispatch(appendComment({ comment, id }))
  }
}

export const {
  setBlogs,
  sortBlogs,
  appendBlog,
  setLike,
  updateBlogs,
  removeBlog,
  appendComment,
} = blogSlice.actions
export default blogSlice.reducer
