import Togglable from './Togglable'
import BlogForm from './BlogForm'
import BlogList from './BlogList'
import { useRef } from 'react'

const Home = () => {
  const blogFormRef = useRef()
  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default Home
