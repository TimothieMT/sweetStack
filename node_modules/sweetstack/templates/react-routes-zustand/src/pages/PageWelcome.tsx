import { useStore } from '../store';
import { Helmet } from 'react-helmet';

export const PageWelcome = () => {
	const store = useStore((state) => state);

	return (
		<div className="pageWelcome">
			<Helmet>
				<title>{store.appTitle} - Welcome</title>
			</Helmet>
			<p>This site has <strong>{store.jobs.length}</strong> jobs and <strong>{store.skills.length}</strong> skills.</p>
		</div>
	);
};

