import mongoose from 'mongoose';
import { Book } from './models/Book.js';
import * as config from './config.js';
import { IBook, INewBook } from './interfaces.js';

mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_CONNECTION);

const decorateAndSanitizeBook = (docBook: any) => {
	const book: IBook = {
		...docBook.toObject({ versionKey: false }),
		languageText: docBook.language.charAt(0).toUpperCase() + docBook.language.slice(1)
	};
	return book;
}

export const getBooks = async () => {
	const docBooks = await Book.find();
	const books: IBook[] = [];
	docBooks.forEach(docBook => {
		books.push(decorateAndSanitizeBook(docBook));
	})
	return books;
}

export const getBook = async (_id: string) => {
	const rawBook = await Book.findOne({ _id });
	const book = decorateAndSanitizeBook(rawBook);
	return book;
}

export const addBook = async (book: INewBook) => {
	return new Promise(async (resolve, reject) => {
		const docBook = new Book(book);
		const addedDocBook = await docBook.save();
		resolve(addedDocBook.toObject({ versionKey: false }));
	});
}

export const replaceBook = async (_id: string, changedBook: INewBook) => {
	const oldBook = await Book.find({ _id});
    await Book.updateOne({ _id }, {$set: {...changedBook}});
	const newBook = await Book.find({ _id });
	return {oldBook, newBook};
}

export const deleteBook = async (_id: string) => {
	const result = await Book.deleteOne({ _id });
	return result;
}

export const getApiInstructions = () => {
	return `
<style>
	body {
		background-color: #444;
		padding: 1rem;
		color: #bbb;
		font-family: sans-serif;
	}
	code {
		background-color: #333;
	}
	li {
		margin-bottom: .3rem;
	}
	a {
		color: yellow;
		font-family: courier;
		background-color: #222;
	}
	span {
		color: #fff;
		font-family: courier;
		background-color: #222;
	}
</style>
<h1>${config.APP_NAME}</h1>

<h2>Public routes</h2>
<ul>
	<li>GET <a href="books">/books</a> - get all books</li>
	<li>GET <span>/books/id</span> - get specific book</li>
	<li>GET <span>/login</span> - login with password</li>
	<li>GET <span>/get-current-user</span> - get the username that is currently logged in</li>
	<li>GET <span>/logout</span> - log current user out</li>
</ul>
<h2>Protected routes</h2>
<ul>
	<li>POST <span>/book</span> - add a book</li>
	<li>PUT <span>/book/id</span> - replace a book</li>
	<li>DELETE <span>/book/id</span> - delete a book</li>
</ul>
	`;
}