import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

export const PageLogin = () => {
	const {
		appTitle,
		loginAsAdmin,
		password,
		setPassword,
		adminIsLoggedIn,
		logoutAsAdmin,
	} = useContext(AppContext);
	const navigate = useNavigate();

	const loginAndRedirect = () => {
		loginAsAdmin(() => {
			navigate('/');
		});
	}

	return (
		<div className="pageLogin">
			<Helmet>
				<title>{appTitle} - Login</title>
			</Helmet>
			{adminIsLoggedIn ? (
				<p>
					<button className="logout" onClick={logoutAsAdmin}>
						Logout
					</button>
				</p>
			) : (
				<p>
					Identify as admin:{' '}
					<input
						type="password"
						autoFocus
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>{' '}
					<button onClick={loginAndRedirect} type="button">
						Login
					</button>
				</p>
			)}
		</div>
	);
};
