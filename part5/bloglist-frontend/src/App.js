import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'
import blogService from './services/blogs'
import { Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Blog from './components/Blog'
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User'

import './styles/App.scss'
import Navigation from './components/Navigation'

const App = () => {
  const dispatch = useDispatch()
  const userLogged = useSelector((state) => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      blogService.setToken(userLogged.token)
      dispatch(setUser(userLogged))
    }
    return () => {
      document.body.style.display = 'grid'
    }
  }, [])

  return (
    <div>
      {userLogged === null ? (
        <div className="app">
          <Notification />
          <LoginForm />
        </div>
      ) : (
        <div>
          <Notification />
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
