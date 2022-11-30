import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ALL_AUTHORS, EDIT_BIRTH_YEAR } from '../queries/queries';
import Select from 'react-select';

const Authors = (props) => {
	const result = useQuery(ALL_AUTHORS);
	const [changeBirthYear, resultBirthYear] = useMutation(EDIT_BIRTH_YEAR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
	});
	const [born, setBorn] = useState('');
	const [options, setOptions] = useState([]);
	const [selectedOption, setSelectedOption] = useState(null);
	const [allOptions, setAllOptions] = useState(false);

	useEffect(() => {
		if (resultBirthYear.data && resultBirthYear.data.editAuthor === null) {
			console.log('author not found');
		}
	}, [resultBirthYear.data]);

	if (!props.show) {
		return null;
	}
	if (result.loading) {
		return <div>loading...</div>;
	}

	const authors = result ? result.data.allAuthors : [];

	if (result && !allOptions) {
		result.data.allAuthors.forEach((author) => {
			setOptions((options) =>
				options.concat({
					value: author.name.toString(),
					label: author.name.toString(),
				})
			);
		});
		setSelectedOption(null);
		setAllOptions(true);
	}

	const handleBirthYear = (event) => {
		event.preventDefault();

		const birthYear = parseInt(born);
		changeBirthYear({ variables: { name: selectedOption.value, birthYear } });

		setBorn('');
	};
	if (!props.token) {
		return (
			<div>
				<h2>authors</h2>
				<table>
					<tbody>
						<tr>
							<th></th>
							<th>born</th>
							<th>books</th>
						</tr>
						{authors.map((a) => (
							<tr key={a.name}>
								<td>{a.name}</td>
								<td>{a.born}</td>
								<td>{a.bookCount}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<h2>set Birth Year</h2>
			<form onSubmit={handleBirthYear}>
				<div>
					name
					<Select
						defaultValue={selectedOption}
						onChange={setSelectedOption}
						options={options}
					/>
				</div>
				<div>
					born
					<input
						value={born}
						onChange={({ target }) => setBorn(target.value)}
					/>
				</div>
				<button type="submit">update author</button>
			</form>
		</div>
	);
};

export default Authors;
