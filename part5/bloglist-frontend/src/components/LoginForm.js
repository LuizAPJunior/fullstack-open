import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import '../styles/LoginForm.scss'

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    document.body.style.display = 'grid'
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userObject = { username, password }
      dispatch(loginUser(userObject))
      setUsername('')
      setPassword('')
    } catch (event) {
      dispatch(setNotification('wrong name or password', 5, true))
    }
  }

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <div className="input-container">
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            id="username"
          />
        </div>
        <label htmlFor="password">Password</label>
        <div className="input-container">
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
        </div>
        <input type="submit" className="login-button" value="Log in" />
      </form>
    </div>
  )
}

export default LoginForm
