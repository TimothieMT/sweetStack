import { useContext, useRef } from 'react';
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
	const passwordRef = useRef() as React.RefObject<HTMLInputElement>;

	const loginAndReact = () => {
		loginAsAdmin(
			() => {
				navigate('/');
			},
			() => {
				if (passwordRef.current !== null) {
					passwordRef.current.focus();
				}
			}
		);
	};

	const handleKeyDown = (e: any) => {
		if (e.key === 'Enter') {
			loginAndReact();
		}
	};

	return (
		<div className="page pageLogin">
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
						ref={passwordRef}
						autoFocus
						value={password}
						onKeyDown={handleKeyDown}
						onChange={(e) => setPassword(e.target.value)}
					/>{' '}
					<button
						disabled={password.trim() === ''}
						onClick={loginAndReact}
						type="button"
					>
						Login
					</button>
				</p>
			)}
		</div>
	);
};
