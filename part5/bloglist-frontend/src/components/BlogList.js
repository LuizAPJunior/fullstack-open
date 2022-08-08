import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import '../styles/BlogList.scss'

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blog)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  return (
    <div className="blogs">
      {blogs.map((blog) => (
        <p key={blog.id} className="blog">
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </p>
      ))}
    </div>
  )
}

export default BlogList
