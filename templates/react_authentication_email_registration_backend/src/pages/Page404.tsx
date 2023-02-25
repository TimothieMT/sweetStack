import { useNavigate } from 'react-router-dom';

export const Page404 = () => {
	const navigate = useNavigate();
	navigate('/');

	return (<div></div>);
};
