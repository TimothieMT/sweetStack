import { useStore } from '../store';
import { Helmet } from 'react-helmet';

export const PageAbout = () => {
	const store = useStore((state) => state);

	return (
		<div className="pageAbout">
			<Helmet>
				<title>{store.appTitle} - About</title>
			</Helmet>
			<p>This is the about page.</p>
		</div>
	);
};