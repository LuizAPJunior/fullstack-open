const bcrypt = require('bcrypt');
const { response } = require('express');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
	const users = await User.find({}).populate('blogs', {
		url: 1,
		title: 1,
		author: 1,
		id: 1,
	});

	response.json(users);
});

usersRouter.get('/:id', async (request, response) => {
	const user = await User.findById(request.params.id).populate('blogs', {
		url: 1,
		title: 1,
		author: 1,
		id: 1,
	});
	response.json(user);
});

usersRouter.post('/', async (request, response) => {
	const { username, name, password } = request.body;

	if (!username || !password || username.length < 3 || password.length < 3) {
		response.status(400).json({
			error: 'username or password are invalid',
		});
		return;
	}

	const users = await User.find({});
	const userDuplicated = users.some((user) => user.username === username);

	if (userDuplicated) {
		response.status(400).json({
			error: `the username ${username} already exists.`,
		});
		return;
	}

	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const user = new User({
		username,
		name,
		passwordHash,
	});

	const savedUser = await user.save();

	response.status(201).json(savedUser);
});

module.exports = usersRouter;
