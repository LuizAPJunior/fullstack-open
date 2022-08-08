import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'
import '../styles/User.scss'

const User = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const users = useSelector((state) => state.users)
  const user = users.find((user) => user.id === id)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [])

  if (!user) {
    return null
  }

  return (
    <div className="user">
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li className="user-blog" key={blog.id}>
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
