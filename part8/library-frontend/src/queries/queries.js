import { gql } from '@apollo/client';

//Fragments

const BOOK_DETAILS = gql`
	fragment BookDetails on Book {
		id
		title
		published
		genres
		author {
			name
			born
		}
	}
`;

//Querys

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`;

export const ALL_BOOKS = gql`
	query {
		allBooks {
			id
			title
			published
			author {
				name
				born
			}
			genres
		}
	}
`;

export const USER_ME = gql`
	query {
		me {
			username
			favouriteGenre
		}
	}
`;

//Mutations

export const CREATE_BOOK = gql`
	mutation createBook(
		$title: String!
		$author: String!
		$publishedNumber: Int!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			author: $author
			published: $publishedNumber
			genres: $genres
		) {
			id
			title
			published
			genres
			author {
				name
				born
			}
		}
	}
`;

export const EDIT_BIRTH_YEAR = gql`
	mutation editBirthYear($name: String!, $birthYear: Int!) {
		editAuthor(name: $name, setBornTo: $birthYear) {
			name
			born
		}
	}
`;

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`;

export const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			...BookDetails
		}
	}

	${BOOK_DETAILS}
`;
