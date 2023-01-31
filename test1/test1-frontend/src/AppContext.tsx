import { useState, useEffect } from 'react';
import { createContext } from 'react';
import axios from 'axios';
import {
	IBook,
	IOriginalEditFields,
	blankNewBook,
	ILoginForm,
	blankLoginForm,
	ILoginFormFields,
	anonymousUser,
	IUser,
	blankMemberInfo,
	IMemberInfo,
	blankAdminInfo,
	IAdminInfo,
} from './interfaces';
import * as tools from './tools';
import { cloneDeep } from 'lodash-es';
import { useNavigate } from 'react-router-dom';

interface IAppContext {
	appTitle: string;
	books: IBook[];
	logUserOut: () => void;
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
	loginForm: ILoginForm;
	changeLoginFormField: (fieldIdCode: string, value: string) => void;
	submitLoginForm: (onBadLogin: () => void) => void;
	currentUser: IUser;
	currentUserIsInAccessGroup: (accessGroup: string) => boolean;
	clearLoginForm: () => void;
	currentUserIsAdmin: () => boolean;
	memberInfo: IMemberInfo;
	adminInfo: IMemberInfo;
	getNoAccessMessage: () => string;
	handleApproveMember: (member: IUser) => void;
}

interface IAppProvider {
	children: React.ReactNode;
}

const backendUrl: string = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [books, setBooks] = useState<IBook[]>([]);
	const appTitle = 'Book Site';
	const [isAdding, setIsAdding] = useState(false);
	const [newBook, setNewBook] = useState<IOriginalEditFields>(blankNewBook);
	const [loginForm, setLoginForm] = useState<ILoginForm>(
		cloneDeep(blankLoginForm)
	);
	const [currentUser, setCurrentUser] = useState<IUser>(anonymousUser);
	const [memberInfo, setMemberInfo] = useState<IMemberInfo>(blankMemberInfo);
	const [adminInfo, setAdminInfo] = useState<IAdminInfo>(blankAdminInfo);

	const navigate = useNavigate();

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

	const getCurrentUser = () => {
		(async () => {
			try {
				const user = (
					await axios.get(`${backendUrl}/get-current-user`, {
						withCredentials: true,
					})
				).data;
				setCurrentUser({ ...user });
			} catch (e: any) {
				console.log('GENERAL ERROR');
			}
		})();
	};

	const loadAccessGroupData = () => {
		if (currentUserIsInAccessGroup('members')) {
			(async () => {
				const memberInfo = (
					await axios.get(`${backendUrl}/get-member-info`, {
						withCredentials: true,
					})
				).data;
				setMemberInfo(cloneDeep(memberInfo));
			})();
		}
		if (currentUserIsInAccessGroup('admins')) {
			(async () => {
				const adminInfo = (
					await axios.get(`${backendUrl}/get-admin-info`, {
						withCredentials: true,
					})
				).data;
				setAdminInfo(cloneDeep(adminInfo));
			})();
		}
	};

	// this loads data when a currentUser has been defined
	// on page reload, currentUser is anonymous for short time
	// then any user that is logged in is loaded into currentUser
	useEffect(() => {
		loadAccessGroupData();
	}, [currentUser]);

	useEffect(() => {
		loadBooks();
	}, []);

	useEffect(() => {
		getCurrentUser();
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
		}
	};

	const handleEditBook = (book: IBook) => {
		book.isBeingEdited = true;
		setBooks([...books]);
	};

	const logUserOut = () => {
		setCurrentUser({ ...anonymousUser });
		(async () => {
			try {
				await axios.get(`${backendUrl}/logout`, {
					withCredentials: true,
				});
				getCurrentUser();
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
		}
	};

	const changeLoginFormField = (fieldIdCode: string, value: string) => {
		loginForm.fields[fieldIdCode as keyof ILoginFormFields] = value;
		setLoginForm({ ...loginForm });
	};

	const submitLoginForm = async (onBadLogin: () => void) => {
		try {
			const response = await axios.post(
				`${backendUrl}/login`,
				{
					username: loginForm.fields.username,
					password: loginForm.fields.password,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				}
			);
			const user: IUser = response.data;
			if (user.accessGroups.includes('loggedInUsers')) {
				setCurrentUser({ ...user });
				setLoginForm({ ...blankLoginForm });
				navigate('/');
			} else {
				loginForm.fields.password = '';
				loginForm.message = 'Bad login, try again.';
				setLoginForm(cloneDeep(loginForm));
				onBadLogin();
			}
		} catch (e: any) {
			console.log(`GENERAL ERROR: ${e.message}`);
		}
	};

	const currentUserIsInAccessGroup = (accessGroup: string) => {
		return currentUser.accessGroups.includes(accessGroup);
	};

	const clearLoginForm = () => {
		setLoginForm(cloneDeep(blankLoginForm));
	};

	const currentUserIsAdmin = () => {
		return currentUserIsInAccessGroup('admins');
	};

	const getNoAccessMessage = () => {
		if (currentUserIsInAccessGroup('loggedOutUsers')) {
			return 'Your session has ended, please log in again.';
		} else {
			return 'You do not have access to this page.';
		}
	};

	const handleApproveMember = async (member: IUser) => {
		try {
			const response = await axios.patch(
				`${backendUrl}/approve-member`,
				{
					_id: member._id,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				}
			);
			loadAccessGroupData();
		} catch (e: any) {
			console.log(`GENERAL ERROR: ${e.message}`);
		}
	};
	return (
		<AppContext.Provider
			value={{
				appTitle,
				books,
				logUserOut,
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
				loginForm,
				changeLoginFormField,
				submitLoginForm,
				currentUser,
				currentUserIsInAccessGroup,
				clearLoginForm,
				currentUserIsAdmin,
				memberInfo,
				getNoAccessMessage,
				adminInfo,
				handleApproveMember,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
