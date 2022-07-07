const _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}


const favoriteBlog = (blogs) => {
    const reducer = (a, b) => {
        if (a.likes > b.likes)
            return a
        return b
    }
    return blogs.length === 0
        ? {}
        : blogs.reduce(reducer, 0)
}

const mostBlogs = (blogs) => {
    const blogByAuthor = _(blogs).groupBy('author')
        .map((blog) => {
            const obj = {}
            obj.authorBlog = _.countBy(blog, "author")
            obj.author = Object.keys(obj.authorBlog)[0]
            obj.blogs = obj.authorBlog[obj.author]
            delete obj.authorBlog
            return obj
        }).value()

    const reducer = (a, b) => {
        if (a.blogs > b.blogs)
            return a
        return b
    }
    const result = blogByAuthor.reduce(reducer, {})
    return result
}

const mostLikes = (blogs) => {
    const blogByAuthor = _(blogs).groupBy('author')
        .map((blog) => {
            const obj = {}
            obj.authorBlog = _.countBy(blog, "author")
            obj.author = Object.keys(obj.authorBlog)[0]
            obj.likes =  _.sumBy(blog, "likes")
            delete obj.authorBlog
            return obj
        }).value()

    const reducer = (a, b) => {
        if (a.likes > b.likes)
            return a
        return b
    }
    const result = blogByAuthor.reduce(reducer, {})
    return result
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}