import { useContext } from 'react';
import { AppContext } from './AppContext';
import './App.scss';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { PageBooks } from './pages/PageBooks';
import { PageLogin } from './pages/PageLogin';
import { PageLogout } from './pages/PageLogout';
import { PageMembers } from './pages/PageMembers';
import { PageAdmins } from './pages/PageAdmins';

function App() {
	const { currentUser, currentUserIsInAccessGroup } =
		useContext(AppContext);
	return (
		<div className="App">
			<h1>Book Site</h1>
			{currentUserIsInAccessGroup('loggedInUsers') && (
				<div className="userArea">
					<span className="userInfo">
						{currentUser.firstName} {currentUser.lastName}
					</span>
					{currentUserIsInAccessGroup('unapprovedMembers') && (
						<span className="note">
							Your application for membership has been received
							and will be approved soon.
						</span>
					)}
				</div>
			)}
			<nav>
				<NavLink to="/books">Books</NavLink>
				{currentUserIsInAccessGroup('members') && (
					<NavLink to="/members">Members</NavLink>
				)}
				{currentUserIsInAccessGroup('admins') && (
					<NavLink to="/admins">Admins</NavLink>
				)}
				{currentUserIsInAccessGroup('loggedInUsers') ? (
					<NavLink to="/logout">Logout</NavLink>
				) : (
					<NavLink to="/login">Login</NavLink>
				)}
			</nav>

			<Routes>
				{currentUser.username != '' && (
					<>
						<Route path="/books" element={<PageBooks />} />
						<Route path="/members" element={<PageMembers />} />
						<Route path="/admins" element={<PageAdmins />} />
						{currentUserIsInAccessGroup('loggedInUsers') ? (
							<Route path="/logout" element={<PageLogout />} />
						) : (
							<Route path="/login" element={<PageLogin />} />
						)}
						<Route
							path="/"
							element={<Navigate to="/books" replace />}
						/>
					</>
				)}
			</Routes>
		</div>
	);
}

export default App;
