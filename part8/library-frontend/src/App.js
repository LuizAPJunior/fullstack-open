import { useQuery, useApolloClient, useSubscription } from '@apollo/client';
import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import LoginForm from './components/LoginForm';
import NewBook from './components/NewBook';
import Recommend from './components/Recommend';
import { updateCache } from './helper/updateCache';
import { ALL_BOOKS, BOOK_ADDED } from './queries/queries';

const App = () => {
	const [token, setToken] = useState(
		localStorage.getItem('library-user-token')
	);
	const [page, setPage] = useState('authors');
	const result = useQuery(ALL_BOOKS);
	const client = useApolloClient();
	useSubscription(BOOK_ADDED, {
		onData: ({ data }) => {
			const addedBook = data.data.bookAdded;
			updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
		},
	});

	const logout = () => {
		setToken(null);
		localStorage.clear();
		client.resetStore();
		setPage('authors');
	};

	if (!token) {
		return (
			<div>
				<div>
					<button onClick={() => setPage('authors')}>authors</button>
					<button onClick={() => setPage('books')}>books</button>
					<button onClick={() => setPage('login')}>login</button>
				</div>

				<Authors show={page === 'authors'} token={token} />

				<Books
					show={page === 'books'}
					books={result.data ? result.data.allBooks : null}
				/>

				<LoginForm
					show={page === 'login'}
					setToken={setToken}
					setPage={setPage}
				/>
			</div>
		);
	}

	return (
		<div>
			<div>
				<button onClick={() => setPage('authors')}>authors</button>
				<button onClick={() => setPage('books')}>books</button>
				<button onClick={() => setPage('add')}>add book</button>
				<button onClick={() => setPage('recommend')}>recommend</button>
				<button onClick={logout}> logout </button>
			</div>

			<Authors show={page === 'authors'} token={token} />

			<Books
				show={page === 'books'}
				books={result.data ? result.data.allBooks : null}
			/>

			<NewBook show={page === 'add'} />

			<Recommend show={page === 'recommend'} />
		</div>
	);
};

export default App;
