import { useContext } from 'react';
import { AppContext } from './AppContext';
import './App.scss';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { PageFlashcards } from './pages/PageFlashcards';
import { PageLogin } from './pages/PageLogin';
import { PageLogout } from './pages/PageLogout';
import { BiLoader } from 'react-icons/bi';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const { appMessage, adminIsLoggedIn, systemErrorExists, flashcards } =
		useContext(AppContext);
	return (
		<div className="App">
			<ToastContainer
				position="top-right"
				autoClose={2500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
				className="toast-position"
			/>
			{adminIsLoggedIn ? (
				<h1 className="adminMode"><span className="sideIcon">&lt;</span>ADMIN MODE<span className="sideIcon">&gt;</span></h1>
			) : (
				<h1>Learn Site</h1>
			)}
			{appMessage && (
				<div className="appMessage">
					<div className="inner">
						<div className="messageText">
							{appMessage}{' '}
							{systemErrorExists && (
								<span>
									Please <a href="/Users/timtolk/Desktop/sweetStack/templates/react_sqlite_CRUD/src/pages">try again</a> later.
								</span>
							)}
						</div>{' '}
					</div>
				</div>
			)}

			{!systemErrorExists && (
				<>
					{flashcards.length === 0 ? (
						<div className="siteLoading">
							<BiLoader className="spinner" />
						</div>
					) : (
						<>
							<nav>
								<NavLink to="/flashcards">Flashcards</NavLink>
								{adminIsLoggedIn ? (
									<NavLink to="/logout">Logout</NavLink>
								) : (
									<NavLink to="/login">Login</NavLink>
								)}
							</nav>

							<Routes>
								<Route
									path="/flashcards"
									element={<PageFlashcards />}
								/>
								{adminIsLoggedIn ? (
									<Route
										path="/logout"
										element={<PageLogout />}
									/>
								) : (
									<Route
										path="/login"
										element={<PageLogin />}
									/>
								)}
								<Route
									path="/"
									element={
										<Navigate to="/flashcards" replace />
									}
								/>
							</Routes>
						</>
					)}
				</>
			)}
		</div>
	);
}

export default App;
