import { useState, useEffect } from 'react';
import { createContext } from 'react';
import axios from 'axios';

interface IAppContext {
	appTitle: string;
	loginAsAdmin: (callback: () => void) => void;
	logoutAsAdmin: () => void;
	password: string;
	setPassword: (password: string) => void;
	appMessage: string;
	deleteAppMessage: () => void;
	adminIsLoggedIn: boolean;
	welcomeMessage: string;
	turnOnWelcomeMessageEditMode: () => void;
	isEditingWelcomeMessage: boolean;
	setWelcomeMessage: (message: string) => void;
	handleSaveWelcomeMessage: () => void;
}

interface IAppProvider {
	children: React.ReactNode;
}

const backendUrl = 'http://localhost:3511';

export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const appTitle = 'Info Site';
	const [password, setPassword] = useState('');
	const [adminIsLoggedIn, setAdminIsLoggedIn] = useState(false);
	const [appMessage, setAppMessage] = useState('');
	const [welcomeMessage, setWelcomeMessage] = useState('');
	const [isEditingWelcomeMessage, setIsEditingWelcomeMessage] =
		useState(false);

	const loadWelcomeMessage = async () => {
		const _welcomeMessage = (
			await axios.get(`${backendUrl}/welcomemessage`)
		).data;
		setWelcomeMessage(_welcomeMessage);
	};

	useEffect(() => {
		(async () => {
			try {
				const user = (
					await axios.get(`${backendUrl}/currentuser`, {
						withCredentials: true,
					})
				).data;
				if (user === 'admin') {
					setAdminIsLoggedIn(true);
				}
			} catch (e: any) {
				if (e.code !== 'ERR_BAD_REQUEST') {
					const _appMessage = `Sorry, there was an unknown error (${e.code}).`;
					setAppMessage(_appMessage);
				}
			}
		})();
	}, []);

	useEffect(() => {
		loadWelcomeMessage();
	}, []);

	const loginAsAdmin = async (callback: () => void) => {
		let _appMessage = '';
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
			callback();
		} catch (e: any) {
			switch (e.code) {
				case 'ERR_BAD_REQUEST':
					_appMessage =
						'Sorry, credentials were incorrect, please attempt login again.';
					break;
				case 'ERR_NETWORK':
					_appMessage =
						"Sorry, we aren't able to process your request at this time.";
					break;
				default:
					_appMessage = `Sorry, there was an unknown error (${e.code}).`;
					break;
			}
			setAdminIsLoggedIn(false);
		}
		setAppMessage(_appMessage);
		setPassword('');
	};

	const deleteAppMessage = () => {
		setAppMessage('');
	};

	const logoutAsAdmin = () => {
		(async () => {
			try {
				const user = (
					await axios.get(`${backendUrl}/logout`, {
						withCredentials: true,
					})
				).data;
				setAdminIsLoggedIn(false);
			} catch (e: any) {
				console.log(
					`There was a problem with the logout: ${e.message}`
				);
			}
		})();
	};

	const turnOnWelcomeMessageEditMode = () => {
		setIsEditingWelcomeMessage(true);
	};

	const handleSaveWelcomeMessage = async () => {
		let _appMessage = '';
		try {
			await axios.post(
				`${backendUrl}/welcomeMessage`,
				{
					welcomeMessage,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				}
			);
			setIsEditingWelcomeMessage(false);
		} catch (e: any) {
			switch (e.code) {
				case 'ERR_BAD_REQUEST':
					_appMessage =
						'Sorry, you had been logged out when you tried to save the welcome message. Please log in again.';
					break;
				case 'ERR_NETWORK':
					_appMessage =
						"Sorry, we aren't able to process your request at this time.";
					break;
				default:
					_appMessage = `Sorry, there was an unknown error (${e.code}).`;
					break;
			}
			setAppMessage(_appMessage);
			setAdminIsLoggedIn(false);
			loadWelcomeMessage();
			setIsEditingWelcomeMessage(false);
		}
	};

	return (
		<AppContext.Provider
			value={{
				appTitle,
				loginAsAdmin,
				logoutAsAdmin,
				password,
				setPassword,
				appMessage,
				deleteAppMessage,
				adminIsLoggedIn,
				welcomeMessage,
				turnOnWelcomeMessageEditMode,
				isEditingWelcomeMessage,
				setWelcomeMessage,
				handleSaveWelcomeMessage,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
