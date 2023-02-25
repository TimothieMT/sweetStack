import { useState } from 'react';
import axios from 'axios';
import { IUser } from '../interfaces';

interface IPageRegisterProps {
	baseUrl: string;
	setCurrentUser: React.Dispatch<React.SetStateAction<IUser>>;
}

export const PageRegister = (props: IPageRegisterProps) => {
	const { baseUrl, setCurrentUser } = props;
	const [formMessage, setFormMessage] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [errors, setErrors] = useState<string[]>([]);
	const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

	const handleRegisterButton = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		(async () => {
			try {
				const data = (
					await axios.post(
						`${baseUrl}/register`,
						{
							firstName,
							lastName,
							username,
							password,
							email,
							safeOriginCode: import.meta.env
								.VITE_SAFE_ORIGIN_CODE,
						},
						{ withCredentials: true }
					)
				).data;
				if (data.errors.length > 0) {
					setErrors(data.errors);
				} else {
					setFormMessage('');
					setFirstName('');
					setLastName('');
					setUsername('');
					setPassword('');
					setEmail('');
					setErrors([]);
					setRegistrationSuccessful(true);
				}
			} catch (err: any) {
				setErrors([err.response.data]);
			}
		})();
	};

	return (
		<>
			{registrationSuccessful ? (
				<div className="registrationSuccessfulArea">
					<p>Thank you for registering!</p>
					<p>Please check your mail to confirm your email address.</p>
				</div>
			) : (
				<>
					<form>
						<fieldset>
							<div className="row">
								<label>First Name</label>
								<div>
									<input
										type="text"
										autoFocus
										value={firstName}
										onChange={(e) =>
											setFirstName(e.target.value)
										}
									/>
								</div>
							</div>

							<div className="row">
								<label>Last Name</label>
								<div>
									<input
										type="text"
										value={lastName}
										onChange={(e) =>
											setLastName(e.target.value)
										}
									/>
								</div>
							</div>

							<div className="row">
								<label>Username</label>
								<div>
									<input
										type="text"
										value={username}
										onChange={(e) =>
											setUsername(e.target.value)
										}
									/>
								</div>
							</div>

							<div className="row">
								<label>Password</label>
								<div>
									<input
										type="password"
										value={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
									/>
								</div>
							</div>

							<div className="row">
								<label>Email</label>
								<div>
									<input
										type="text"
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
									/>
								</div>
							</div>

							<div className="buttonRow">
								<div className="formMessage">{formMessage}</div>
								<button
									onClick={(e) => handleRegisterButton(e)}
								>
									Login
								</button>
							</div>
						</fieldset>
					</form>
					{errors.length > 0 && (
						<div className="errorArea">
							<ul>
								{errors.map((error, i) => {
									return <li key={i}>{error}</li>;
								})}
							</ul>
						</div>
					)}
				</>
			)}
		</>
	);
};
