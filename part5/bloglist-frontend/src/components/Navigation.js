import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setUser } from '../reducers/userReducer'
import '../styles/Navigation.scss'

const Navigation = () => {
  const dispatch = useDispatch()
  const userLogged = useSelector((state) => state.user)

  useEffect(() => {
    document.body.style.display = 'block'
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

  return (
    <div className="navigation">
      <h2 className="header">Blogs App</h2>
      <Link to="/">Blog</Link>
      <Link to="/users">Users</Link>
      <span>{`${userLogged.name} logged in`}</span>
      <button className="logout-button" onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}

export default Navigation
