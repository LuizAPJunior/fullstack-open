import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { setTogglable } from '../reducers/togglableReducer'
import '../styles/BlogForm.scss'

const BlogForm = () => {
  const dispatch = useDispatch()
  const visible = useSelector((state) => state.togglable)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    return () => {
      if (visible) dispatch(setTogglable(!visible))
    }
  })

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }

    try {
      dispatch(createBlog(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      const message = `${newBlog.title} was posted by ${newBlog.author}`
      dispatch(setNotification(message, 5, false))
      dispatch(setTogglable(!visible))
    } catch (event) {
      const message = 'please fill at least the url and title fields'
      dispatch(setNotification(message, 5, true))
    }
  }

  return (
    <div className="blogform">
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">Title </label>
          <div className="input-container">
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              type="text"
              name="title"
              id="title"
            />
          </div>
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <div className="input-container">
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              type="text"
              name="author"
              id="author"
            />
          </div>
        </div>
        <div>
          <label htmlFor="url">URL</label>
          <div className="input-container">
            <input
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              type="text"
              name="url"
              id="url"
            />
          </div>
        </div>
        <div className="container-buttons">
          <button className="form-button" id="new-blog" type="submit">
            new blog
          </button>
          <button
            className="cancel-button"
            type="button"
            onClick={() => dispatch(setTogglable(!visible))}
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
