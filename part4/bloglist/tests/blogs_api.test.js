const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./blogs_helper')

let users = []

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  await User.deleteMany({})
  const response = await api
    .post('/api/users')
    .send(helper.initialUsers[0])
    .expect('Content-Type', /application\/json/)
    .expect(201)

  const user = response.body
  users = users.concat(user)


}, 10000)


test(' get all blogs ', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test(' test if id is a property in blogs ', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
}, 100000)

test('make a new blog post', async () => {
  const newBlogObject = {
    title: 'Here is the new useEffect documentation',
    author: 'Dan Abromov',
    url: 'https://pt-br.reactjs.org/docs/hooks-effect.html',
    likes: '15'
  }

  const response = await api
    .post('/api/login')
    .send(helper.initialUsers[0])
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const loggedUser = response.body

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${loggedUser.token}`)
    .send(newBlogObject)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const responseBlogs = await api.get('/api/blogs')

  const content = responseBlogs.body.map(blog => blog.title)

  expect(responseBlogs.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(content).toContain('Here is the new useEffect documentation')

}, 30000)

test('test the delete operation of a blog', async () => {


  const newBlogObject = {
    title: 'Here is the new useEffect documentation',
    author: 'Dan Abromov',
    url: 'https://pt-br.reactjs.org/docs/hooks-effect.html',
    likes: '15'
  }

  const response = await api
    .post('/api/login')
    .send(helper.initialUsers[0])
    .expect(200)
    .expect('Content-Type', /application\/json/)


  const loggedUser = response.body


  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${loggedUser.token}`)
    .send(newBlogObject)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[2]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `bearer ${loggedUser.token}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

}, 30000)

test('update likes in a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  blogToUpdate.likes = 50

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[0].likes).toBe(50)
})

test('creation fails if username already taken', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'luffy',
    name: 'Monkey D. Luffy',
    password: 'sereirei',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain(`the username ${newUser.username} already exists.`)

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toEqual(usersAtStart)
})


test('creation fails if username or password are invalid', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    username: 'lu',
    name: 'Monkey D. Luffy',
    password: 'sereirei',
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('username or password are invalid')

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toEqual(usersAtStart)
})



test('if likes field don\'t exist in the object create one with value of 0 ', async () => {
  const newBlogObject = {
    title: 'Here is the new useEffect documentation',
    author: 'Dan Abromov',
    url: 'https://pt-br.reactjs.org/docs/hooks-effect.html',
  }

  const response = await api
    .post('/api/login')
    .send(helper.initialUsers[0])
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const loggedUser = response.body

  const responseBlog = await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${loggedUser.token}`)
    .send(newBlogObject)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const newBlog = responseBlog.body
  expect(newBlog.likes).toBe(0)


}, 30000)

test('creation fails if title or url are missing', async () => {
  const newBlogObject = {
    author: 'Dan Abromov',
    url: 'https://pt-br.reactjs.org/docs/hooks-effect.html',
    likes: 15
  }

  const response = await api
    .post('/api/login')
    .send(helper.initialUsers[0])
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const loggedUser = response.body

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${loggedUser.token}`)
    .send(newBlogObject)
    .expect(400)
    .expect('Content-Type', /application\/json/)

}, 30000)


test('creation of a blog fails if no token is provided', async () => {
  const newBlogObject = {
    title: 'Here is the new useEffect documentation',
    author: 'Dan Abromov',
    url: 'https://pt-br.reactjs.org/docs/hooks-effect.html',
    likes: '15'
  }

  await api
    .post('/api/blogs')
    .send(newBlogObject)
    .expect(401)
    .expect('Content-Type', /application\/json/)

}, 30000)


afterAll(() => {
  mongoose.connection.close()
})