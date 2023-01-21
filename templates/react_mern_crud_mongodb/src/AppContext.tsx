import { useState, useEffect } from 'react';
import { createContext } from 'react';
import axios from 'axios';
import { IBook, IOriginalEditFields, blankNewBook } from './interfaces';
import * as tools from './tools';

interface IAppContext {
	appTitle: string;
	books: IBook[];
	loginAsAdmin: (onSuccess: () => void, onFailure: () => void) => void;
	password: string;
	setPassword: (password: string) => void;
	adminIsLoggedIn: boolean;
	logoutAsAdmin: () => void;
	handleDeleteBook: (book: IBook) => void;
	handleBookFieldChange: (
		fieldIdCode: string,
		book: IBook,
		value: string
	) => void;
	handleEditBook: (book: IBook) => void;
	handleCancelEditBook: (book: IBook) => void;
	handleSaveEditBook: (book: IBook) => void;
	isAdding: boolean;
	handleToggleAddBook: () => void;
	newBook: IOriginalEditFields;
	handleAddBookFieldChange: (
		fieldIdCode: string,
		book: IOriginalEditFields,
		value: string
	) => void;
	handleSaveNewBook: () => void;
}

interface IAppProvider {
	children: React.ReactNode;
}

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [books, setBooks] = useState<IBook[]>([]);
	const appTitle = 'Book Site';
	const [password, setPassword] = useState('');
	const [adminIsLoggedIn, setAdminIsLoggedIn] = useState(false);
	const [isAdding, setIsAdding] = useState(false);
	const [newBook, setNewBook] = useState<IOriginalEditFields>(blankNewBook);

	const loadBooks = () => {
		(async () => {
			let _books: IBook[] = [];
			const response = await axios.get(`${backendUrl}/books`);
			let rawBooks: IBook[] = response.data;
			rawBooks.forEach((rawBook: any) => {
				const _book: IBook = {
					...rawBook,
					isBeingEdited: false,
					originalEditFields: {
						title: rawBook.title,
						description: rawBook.description,
						language: rawBook.language,
					},
				};
				_books.push(_book);
			});
			setBooks(_books);
		})();
	};

	useEffect(() => {
		loadBooks();
	}, []);

	useEffect(() => {
		(async () => {
			try {
				const user = (
					await axios.get(`${backendUrl}/get-current-user`, {
						withCredentials: true,
					})
				).data;
				if (user === 'admin') {
					setAdminIsLoggedIn(true);
				}
			} catch (e: any) {
				console.log('GENERAL ERROR');
			}
		})();
	}, []);

	const handleCancelEditBook = (book: IBook) => {
		book.isBeingEdited = false;
		//reset any values that were changed
		book.originalEditFields = {
			title: book.title,
			description: book.description,
			language: book.language,
		};
		setBooks([...books]);
	};

	const resetAllBooks = () => {
		for (const book of books) {
			book.isBeingEdited = false;
		}
		setBooks([...books]);
	};

	const loginAsAdmin = async (
		onSuccess: () => void,
		onFailure: () => void
	) => {
		try {
			await axios.post(
				`${backendUrl}/login`,
				{
					password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				}
			);
			setAdminIsLoggedIn(true);
			resetAllBooks();
			onSuccess();
		} catch (e: any) {
			switch (e.code) {
				case 'ERR_BAD_REQUEST':
					onFailure();
					break;
				default:
					break;
			}
			setAdminIsLoggedIn(false);
		}
		setPassword('');
	};

	const handleSaveEditBook = async (book: IBook) => {
		try {
			// save in backend
			await axios.put(
				`${backendUrl}/book/${book._id}`,
				{
					title: book.originalEditFields.title,
					description: book.originalEditFields.description,
					language: book.originalEditFields.language,
				},
				{
					withCredentials: true,
				}
			);
			// if it saved in backend, then update in frontend
			book.title = book.originalEditFields.title;
			book.description = book.originalEditFields.description;
			book.language = book.originalEditFields.language;
			book.languageText = tools.capitalizeFirstLetter(
				book.originalEditFields.language
			);
			setBooks([...books]);
			book.isBeingEdited = false;
		} catch (e: any) {
			switch (e.code) {
				case 'ERR_BAD_REQUEST':
					console.log('BAD REQUEST');
					break;
				default:
					console.log('GENERAL ERROR');
					break;
			}
			setAdminIsLoggedIn(false);
		}
	};

	const handleBookFieldChange = (
		fieldIdCode: string,
		book: IBook,
		value: string
	) => {
		book.originalEditFields[fieldIdCode as keyof IOriginalEditFields] =
			value;
		setBooks([...books]);
	};

	const handleDeleteBook = async (book: IBook) => {
		try {
			await axios.delete(`${backendUrl}/book/${book._id}`, {
				withCredentials: true,
			});
			const _books = books.filter((m: IBook) => m._id !== book._id);
			setBooks(_books);
		} catch (e: any) {
			switch (e.code) {
				case 'ERR_BAD_REQUEST':
					console.log('BAD REQUREST');
					break;
				default:
					console.log('GENERAL ERROR');
					break;
			}
			setAdminIsLoggedIn(false);
		}
	};

	const handleEditBook = (book: IBook) => {
		book.isBeingEdited = true;
		setBooks([...books]);
	};

	const logoutAsAdmin = () => {
		(async () => {
			try {
				resetAllBooks();
				setAdminIsLoggedIn(false);
				await axios.get(`${backendUrl}/logout`, {
					withCredentials: true,
				});
			} catch (e: any) {
				console.log('GENERAL ERROR');
			}
		})();
	};

	const handleToggleAddBook = () => {
		setNewBook({ ...blankNewBook });
		setIsAdding(!isAdding);
	};

	const handleAddBookFieldChange = (
		fieldIdCode: string,
		newBook: IOriginalEditFields,
		value: string
	) => {
		newBook[fieldIdCode as keyof IOriginalEditFields] = value;
		setNewBook({ ...newBook });
	};

	const handleSaveNewBook = async () => {
		try {
			// save in backend
			await axios.post(
				`${backendUrl}/book`,
				{
					title: newBook.title,
					description: newBook.description,
					language: newBook.language,
					numberOfPages: 0,
					imageUrl:
						'https://edwardtanguay.vercel.app/share/images/books/no-image.jpg',
					buyUrl: '',
				},
				{
					withCredentials: true,
				}
			);
			// if it saved in backend, then update on frontend
			loadBooks();
			setIsAdding(false);
			setNewBook({ ...blankNewBook });
		} catch (e: any) {
			console.log('GENERAL ERROR');
			setAdminIsLoggedIn(false);
		}
	};

	return (
		<AppContext.Provider
			value={{
				appTitle,
				books,
				loginAsAdmin,
				password,
				setPassword,
				adminIsLoggedIn,
				logoutAsAdmin,
				handleDeleteBook,
				handleBookFieldChange,
				handleEditBook,
				handleCancelEditBook,
				handleSaveEditBook,
				isAdding,
				handleToggleAddBook,
				newBook,
				handleAddBookFieldChange,
				handleSaveNewBook,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
