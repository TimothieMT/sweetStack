import axios from 'axios';
import { IUser } from '../interfaces';
import { useNavigate } from 'react-router-dom';

interface IPageLogoutProps {
	baseUrl: string;
	setCurrentUser: React.Dispatch<React.SetStateAction<IUser>>;
}

export const PageLogout = (props: IPageLogoutProps) => {
	const { baseUrl, setCurrentUser } = props;

	const navigate = useNavigate();

	const handleLogoutButton = () => {
		(async () => {
			const data = (
				await axios.get(
					`${baseUrl}/logout`,{
					withCredentials: true,
				})).data;
			const _currentUser = data.currentUser;
			if (_currentUser.username === 'anonymousUser') {
				setCurrentUser(_currentUser);
				navigate('/');
			} else {
				throw new Error('ERROR: no anonymous user');
			}
		})();
	}
	return (
		<div className="pageLogout">
			<button onClick={handleLogoutButton}>Logout now</button>
		</div>
	);
};