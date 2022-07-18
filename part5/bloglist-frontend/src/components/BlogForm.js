import { useState } from 'react'

const BlogForm = (props) => {
  const { createBlog } = props
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlogObject = {
      title,
      author,
      url,
    }
    setTitle('')
    setAuthor('')
    setUrl('')
    createBlog(newBlogObject)
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor="title">Title: </label>
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          type="text"
          name="title"
          id="title"
        />
      </div>
      <div>
        <label htmlFor="author">Author: </label>
        <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          type="text"
          name="author"
          id="author"
        />
      </div>
      <div>
        <label htmlFor="url">URL: </label>
        <input
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          type="text"
          name="url"
          id="url"
        />
      </div>
      <button id="new-blog" type="submit">new blog</button>
    </form>
  )
}

export default BlogForm
