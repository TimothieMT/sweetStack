import { useState, useEffect } from 'react';
import axios from 'axios';
import { IUser } from '../interfaces';
import { useNavigate } from 'react-router-dom';

interface IPageLoginProps {
	baseUrl: string;
	setCurrentUser: React.Dispatch<React.SetStateAction<IUser>>;
}

export const PageLogin = (props: IPageLoginProps) => {
	const { baseUrl, setCurrentUser } = props;
	const [formMessage, setFormMessage] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const handleLoginButton = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		(async () => {
			const data = (
				await axios.post(
					`${baseUrl}/login`,
					{ username, password, safeOriginCode: import.meta.env.VITE_SAFE_ORIGIN_CODE },
					{ withCredentials: true }
				)
			).data;
			const _currentUser = data.currentUser;
			if (_currentUser.username === 'anonymousUser') {
				setFormMessage('bad login');
			} else {
				setCurrentUser(_currentUser);
				setFormMessage('');
				setUsername('');
				setPassword('');
				navigate('/members');
			}
		})();
	};

	useEffect(() => {
		setFormMessage('');
	}, [username, password]);

	return (
		<form>
			<fieldset>
				<div className="row">
					<label>Username</label>
					<div>
						<input
							autoFocus
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
				</div>

				<div className="row">
					<label>Password</label>
					<div>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</div>

				<div className="buttonRow">
					<div className="formMessage">{formMessage}</div>
					<button onClick={(e) => handleLoginButton(e)}>Login</button>
				</div>
			</fieldset>
		</form>
	);
};
