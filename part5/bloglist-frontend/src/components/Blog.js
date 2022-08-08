import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {
  likeBlog,
  initializeBlogs,
  createComment,
} from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import '../styles/Blog.scss'

const Blog = () => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const id = useParams().id
  const blogs = useSelector((state) => state.blog)
  const blog = blogs.find((blog) => blog.id === id)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  if (!blog) {
    return null
  }

  // const removeBlog = () => {
  //   if (window.confirm(`Remove ${blog.title}`)) {
  //     try {
  //       dispatch(deleteBlog(blog))
  //       dispatch(setNotification(`Deleted ${blog.title}`, 5, false))
  //     } catch (event) {
  //       dispatch(setNotification('User invalid', 5, true))
  //     }
  //   }
  // }

  const updateLikes = () => {
    try {
      dispatch(likeBlog(blog))
    } catch (event) {
      dispatch(setNotification('error in like button', 5, true))
    }
  }

  const addComment = (event) => {
    event.preventDefault()
    dispatch(createComment({ text: comment }, id))
    setComment('')
  }

  return (
    <div className="blog">
      <div>
        <h2>
          {blog.title} - {blog.author}
        </h2>
        <p>{blog.url}</p>
        <div className="likes-container">
          <p className="likes-value">
            {blog.likes}
            <button className="likes-button" onClick={updateLikes}>
              like
            </button>
          </p>
        </div>
        <p> added by {blog.user.name}</p>
        <h3> comments </h3>
        <form onSubmit={addComment} className="form-comment">
          <input
            type="text"
            value={comment}
            name="Comment"
            onChange={({ target }) => setComment(target.value)}
            id="comment"
          />
          <button id="comment-button" type="submit">
            add comment
          </button>
        </form>
        {blog.comments ? (
          <ul className="blog-blogs">
            {blog.comments.map((comment) => (
              <li key={comment.id}>{comment.text}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}
export default Blog
