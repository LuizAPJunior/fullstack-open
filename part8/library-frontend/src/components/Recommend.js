import { useQuery } from '@apollo/client';
import { ALL_BOOKS, USER_ME } from '../queries/queries';

const Recommend = (props) => {
	const result = useQuery(ALL_BOOKS);
	const resultUser = useQuery(USER_ME);
	if (!props.show) {
		return null;
	}

	if (result.loading) {
		return <div>loading...</div>;
	}
	const user = resultUser ? resultUser.data.me : null;
	const books = result ? result.data.allBooks : [];
	const booksToShow = user.favouriteGenre
		? books.filter((book) => book.genres.includes(user.favouriteGenre) === true)
		: books;

	return (
		<div>
			<h2>recommendations</h2>
			{user.favouriteGenre ? (
				<p>books in your favourite genre {<b>{user.favouriteGenre}</b>}</p>
			) : null}
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{booksToShow.map((book) => (
						<tr key={book.title}>
							<td>{book.title}</td>
							<td>{book.author.name}</td>
							<td>{book.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Recommend;
