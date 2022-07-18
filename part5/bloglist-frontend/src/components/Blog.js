import { useEffect, useState } from 'react'

const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likedButton = () => {
    setLikes(likes + 1)
    setLiked(true)
  }

  useEffect(() => {
    if (liked) {
      const updateObject = { ...blog, likes }
      updateLikes(updateObject)
      setLiked(false)
    }
  }, [likes, blog, updateLikes, liked])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div className="blog">
      <div style={hideWhenVisible}>
        <div style={blogStyle} className="blog-default">
          <p>
            {blog.title} - {blog.author}{' '}
            <button onClick={toggleVisibility}>show</button>{' '}
          </p>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div style={blogStyle}>
          <p>
            {blog.title} - {blog.author}{' '}
            <button onClick={toggleVisibility}>hide</button>{' '}
          </p>
          <p>{blog.url}</p>
          <p className='likes-value'>
            {blog.likes} <button className='likes' onClick={likedButton}>like</button>{' '}
          </p>
          <p>{blog.user.name}</p>
          <button onClick={() => deleteBlog(blog)}> remove </button>
        </div>
      </div>
    </div>
  )
}
export default Blog
