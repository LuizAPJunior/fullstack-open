const { UserInputError, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

const { PubSub } = require('graphql-subscriptions');
const pubsub = new PubSub();

const resolvers = {
	Author: {
		bookCount: async (root) => {
			const books = await Book.find({ author: root._id }).count();
			return books;
		},
	},
	Query: {
		bookCount: async (root, args) => {
			if (!args.author) return Book.collection.countDocuments();
			const author = await Author.findOne({ name: args.author });
			const books = await Book.find({ author: author._id.toString() }).count();
			return books;
		},
		authorCount: async () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			if (!args.author && !args.genre) {
				return Book.find({}).populate('author', { name: 1, born: 1 });
			}
			if (!args.author) {
				return Book.find({ genres: { $in: [args.genre] } }).populate('author', {
					name: 1,
					born: 1,
				});
			}
			if (args.author && args.genre) {
				const author = await Author.findOne({ name: args.author });
				return Book.find({
					$and: [
						{ author: author._id.toString() },
						{ genres: { $in: [args.genre] } },
					],
				}).populate('author', { name: 1, born: 1 });
			}
			const author = await Author.findOne({ name: args.author });
			return Book.find({ author: author._id.toString() }).populate('author', {
				name: 1,
				born: 1,
			});
		},
		allAuthors: async () => {
			const authors = await Author.find({});
			console.log(authors);
			return authors;
		},
		me: (root, args, context) => {
			return context.currentUser;
		},
	},
	Mutation: {
		addBook: async (root, args, context) => {
			const currentUser = context.currentUser;
			if (!currentUser) {
				throw new AuthenticationError('not authenticated');
			}

			let author = await Author.findOne({ name: args.author });
			if (!author) {
				author = new Author({ name: args.author });
				try {
					await author.save();
				} catch (error) {
					throw new UserInputError(error.message, {
						invalidArgs: args,
					});
				}
			}
			const book = new Book({ ...args, author: author._id.toString() });

			try {
				await book.save();
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			}

			const bookType = await Book.findOne({ _id: book._id }).populate(
				'author',
				{
					name: 1,
					born: 1,
					bookCount: 1,
				}
			);
			pubsub.publish('BOOK_ADDED', { bookAdded: bookType });

			return bookType;
		},
		editAuthor: async (root, args, context) => {
			const currentUser = context.currentUser;
			if (!currentUser) {
				throw new AuthenticationError('not authenticated');
			}

			const author = await Author.findOne({ name: args.name });
			author.born = args.setBornTo;

			try {
				await author.save();
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				});
			}
			return author;
		},
		createUser: async (root, args) => {
			const user = new User({
				username: args.username,
				favouriteGenre: args.favouriteGenre,
			});

			try {
				await user.save();
			} catch {
				(error) => {
					throw new UserInputError(error.message, {
						invalidArgs: args,
					});
				};
			}
			return user;
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });

			if (!user || args.password !== 'secret') {
				throw new UserInputError('wrong credentials');
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			};

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
		},
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
		},
	},
};

module.exports = resolvers;
