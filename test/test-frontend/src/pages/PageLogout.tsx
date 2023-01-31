import { useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';
import { useNavigate } from 'react-router-dom';

export const PageLogout = () => {
	const { logUserOut } = useContext(AppContext);
	const navigate = useNavigate();

	useEffect(() => {
		logUserOut();
		navigate('/');
	}, []);
	return (<></>);
};