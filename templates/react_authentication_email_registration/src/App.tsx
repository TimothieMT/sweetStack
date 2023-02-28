import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';
import { NavLink, Route, Routes, Navigate } from 'react-router-dom';
import { IUser } from './interfaces';
import { PageWelcome } from './pages/PageWelcome';
import { PageMembers } from './pages/PageMembers';
import { PageRegister } from './pages/PageRegister';
import { PageLogin } from './pages/PageLogin';
import { PageLogout } from './pages/PageLogout';
import { PageConfirmRegistration } from './pages/PageConfirmRegistration';
import { Page404 } from './pages/Page404';
import { useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
	const [currentUser, setCurrentUser] = useState<IUser>({
		username: '',
		firstName: '',
		lastName: '',
		accessGroups: [],
	});

	const navigate = useNavigate();

	useEffect(() => {
		(async () => {
			const data = (
				await axios.get(`${baseUrl}/current-user`, {
					withCredentials: true,
				})
			).data;
			const _currentUser = data.currentUser;
			setCurrentUser(_currentUser);
		})();
	}, []);

	const handleLogoutButton = () => {
		(async () => {
			const data = (
				await axios.get(`${baseUrl}/logout`, {
					withCredentials: true,
				})
			).data;
			const _currentUser = data.currentUser;
			if (_currentUser.username === 'anonymousUser') {
				setCurrentUser(_currentUser);
				navigate('/');
			} else {
				throw new Error('ERROR: no anonymous user');
			}
		})();
	};

	const pageIsLoaded = () => {
		return currentUser.username !== '';
	};

	return (
		<div className="App">
			<h1>Our Language Group</h1>
			{pageIsLoaded() && currentUser.username !== 'anonymousUser' && (
				<div className="userFullName">
					<span>
						{currentUser.firstName} {currentUser.lastName}
					</span>
				</div>
			)}
			<nav>
				<NavLink to="/welcome">Welcome</NavLink>
				{!pageIsLoaded() && (
					<span className="navCommand">
						<span className="spinner">
							<FaSpinner />
						</span>
					</span>
				)}
				{(currentUser.accessGroups.includes('members') ||
					currentUser.accessGroups.includes(
						'unconfirmedMembers'
					)) && <NavLink to="/members">Members</NavLink>}
				{currentUser.accessGroups.includes('loggedOutUsers') && (
					<NavLink to="/register">Register</NavLink>
				)}
				{currentUser.accessGroups.includes('loggedOutUsers') && (
					<NavLink to="/login">Login</NavLink>
				)}
				{currentUser.accessGroups.includes('loggedInUsers') && (
					<span className="navCommand" onClick={handleLogoutButton}>
						Logout
					</span>
				)}
			</nav>
			<Routes>
				<Route path="*" element={<Page404 />} />
				<Route path="/welcome" element={<PageWelcome />} />
				{(currentUser.accessGroups.includes('members') ||
					currentUser.accessGroups.includes(
						'unconfirmedMembers'
					)) && <Route path="/members" element={<PageMembers currentUser={currentUser} />} />}
				<Route
					path="/register"
					element={
						<PageRegister
							baseUrl={baseUrl}
							setCurrentUser={setCurrentUser}
						/>
					}
				/>
				<Route
					path="/login"
					element={
						<PageLogin
							baseUrl={baseUrl}
							setCurrentUser={setCurrentUser}
						/>
					}
				/>
				{currentUser.accessGroups.includes('loggedInUsers') && (
					<Route
						path="/logout"
						element={
							<PageLogout
								baseUrl={baseUrl}
								setCurrentUser={setCurrentUser}
							/>
						}
					/>
				)}
				<Route
					path="/confirm-registration/:confirmationCode"
					element={<PageConfirmRegistration
								baseUrl={baseUrl}
								setCurrentUser={setCurrentUser}
					/>}
				/>
				<Route path="/" element={<Navigate to="/welcome" replace />} />
			</Routes>
		</div>
	);
}

export default App;
