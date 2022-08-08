const blogsRouter = require('express').Router();
const { response } = require('../app');
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({})
		.populate('user', {
			username: 1,
			name: 1,
			id: 1,
		})
		.populate('comments', { text: 1, id: 1 });
	response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
	const blog = await Blog.findById(request.params.id);
	if (blog) {
		response.json(blog);
	} else {
		response.status(404).end();
	}
});

blogsRouter.post('/', userExtractor, async (request, response) => {
	const user = request.user;

	if (!request.body.likes) {
		request.body.likes = 0;
	}

	if (!request.body.title || !request.body.url) {
		return response.status(400).json({ error: 'url or title is missing ' });
	}

	const blog = new Blog({ ...request.body, user: user._id });

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(blog._id);
	await user.save();
	response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
	const user = request.user;

	const blog = await Blog.findById(request.params.id);
	if (user.id.toString() !== blog.user.toString()) {
		return response.status(401).json({ error: 'user invalid' });
	}

	await Blog.findByIdAndRemove(request.params.id);
	response.status(204).end();
});

blogsRouter.put('/:id', userExtractor, async (request, response) => {
	const body = request.body;

	const user = request.user;

	//const blog = await Blog.findById(request.params.id)

	const blogObject = { ...body, user: user.id.toString() };

	updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blogObject, {
		new: true,
	}).populate('user', { username: 1, name: 1, id: 1 });
	response.json(updatedBlog);
});

blogsRouter.post('/:id/comments', async (request, response) => {
	const body = request.body;
	const comment = new Comment(body);
	const savedComment = await comment.save();
	const blog = await Blog.findById(request.params.id);
	blog.comments.push(comment);
	await blog.save();
	response.status(201).json(savedComment);
});

module.exports = blogsRouter;
