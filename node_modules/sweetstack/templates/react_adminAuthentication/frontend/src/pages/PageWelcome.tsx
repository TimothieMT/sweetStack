import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { Helmet } from 'react-helmet';

export const PageWelcome = () => {
	const {
		appTitle,
		welcomeMessage,
		setWelcomeMessage,
		handleSaveWelcomeMessage,
		adminIsLoggedIn,
		turnOnWelcomeMessageEditMode,
		isEditingWelcomeMessage,
	} = useContext(AppContext);

	return (
		<div className="pageWelcome">
			<Helmet>
				<title>{appTitle} - Welcome</title>
			</Helmet>
			<p>
				<>
					{!isEditingWelcomeMessage && <span>{welcomeMessage}</span>}
					{adminIsLoggedIn && (
						<>
							{!isEditingWelcomeMessage ? (
								<>
									{' '}
									<button
										onClick={turnOnWelcomeMessageEditMode}
									>
										Edit
									</button>
								</>
							) : (
								<>
									<input
										className="theWelcomeMessage"
										type="text"
										autoFocus
										onChange={(e) =>
											setWelcomeMessage(e.target.value)
										}
										value={welcomeMessage}
									/>{' '}
									<button onClick={handleSaveWelcomeMessage}>
										Save
									</button>
								</>
							)}
						</>
					)}
				</>
			</p>
		</div>
	);
};
