import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notifMessage, setNotifMessage] = useState(null)
  const [notifError, setNotifError] = useState(false)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs.sort(sortBlog)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotifError(true)
      setNotifMessage('wrong name or password')
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotifError(false)
      setNotifMessage(
        `${returnedBlog.title} was posted by ${returnedBlog.author}`
      )
    } catch (event) {
      setNotifError(true)
      setNotifMessage('please fill at least the url and title fields')
    } finally {
      blogService.getAll().then((blogs) => setBlogs(blogs.sort(sortBlog)))
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    }
  }

  const updateLikes = async (blogObject) => {
    try {
      const returnedBlog = await blogService.update(blogObject.id, blogObject)
      setBlogs(
        blogs.map((blog) => (blog.id !== blogObject.id ? blog : returnedBlog))
      )
    } catch (event) {
      setNotifError(true)
      setNotifMessage('error in likes button')
    } finally {
      blogService.getAll().then((blogs) => setBlogs(blogs.sort(sortBlog)))
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blogObject) => {
    if (window.confirm(`Remove ${blogObject.title}`)) {
      blogService
        .deleteBlog(blogObject.id)
        .then(() => {
          setBlogs(() => blogs.filter((blog) => blog.id !== blogObject.id))
          setNotifError(false)
          setNotifMessage(`Deleted ${blogObject.title}`)
          setTimeout(() => {
            setNotifMessage(null)
          }, 5000)
        })
        .catch(() => {
          setNotifError(true)
          setNotifMessage('User invalid')
          setTimeout(() => {
            setNotifMessage(null)
          }, 5000)
        })
    }
  }

  const sortBlog = (a, b) => {
    return b.likes - a.likes
  }

  return (
    <div>
      {user === null ? (
        <div>
          <Notification message={notifMessage} notifError={notifError} />
          <LoginForm
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
          />
        </div>
      ) : (
        <div>
          <Notification message={notifMessage} notifError={notifError} />
          <h2>blogs</h2>
          <p>
            <span>{`${user.name} logged in`}</span>
            <button onClick={handleLogout}>logout</button>
          </p>
          <h2>create new</h2>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes={updateLikes}
              deleteBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
