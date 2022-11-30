import { useState } from 'react';

const Books = (props) => {
	const [genres, setGenres] = useState([]);
	const [selectedGenre, setSelectedGenre] = useState('');

	if (!props.show) {
		return null;
	}

	// if (result.loading) {
	// 	return <div>loading...</div>;
	// }

	const books = props.books ? props.books : [];
	const booksToShow = selectedGenre
		? books.filter((book) => book.genres.includes(selectedGenre) === true)
		: books;

	return (
		<div>
			<h2>books</h2>
			{selectedGenre ? <p>in genre {<b>{selectedGenre}</b>}</p> : null}
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

			{books.forEach((book) => {
				book.genres.forEach((genre) => {
					if (!genres.includes(genre)) {
						setGenres(genres.concat(genre));
					}
				});
			})}

			{genres
				? genres.map((genre) => (
						<button key={genre} onClick={() => setSelectedGenre(genre)}>
							{genre}
						</button>
				  ))
				: null}
			<button onClick={() => setSelectedGenre('')}>all genres</button>
		</div>
	);
};

export default Books;
