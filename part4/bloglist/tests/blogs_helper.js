const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    }
]


const initialUsers = [
    {
      username: 'luffy',
      name: 'Monkey D. Luffy',
      password: 'sereirei',
    },
    {
      username: 'zoro',
      name: 'Roronoa Zoro',
      password: 'sereiespada'
    }
]

const nonExistingId = async () => {
    const blog = new blog({ title: 'is this title real?', author: 'idontexist', url: "", likes: -5 })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }



module.exports = {
    initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}