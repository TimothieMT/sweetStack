import { useContext, useEffect } from 'react';
import { AppContext } from '../appContext';
import '../styles/pageLogin.scss';

export const PageLogin = () => {
	const { pin, handleChangePin, prePageLoad, isAdmin, handleIdentifyAsAdminButton, handleLogoutButton } =
		useContext(AppContext);

	useEffect(() => {
		prePageLoad();
	}, []);

	return (
		<div className="page pageLogin">
			<form>
				<fieldset>
					<legend>Identify as Admin</legend>

					{!isAdmin ? (
						<>
							<div className="row">
								<label>Pin</label>
								<div>
									<input
										value={pin}
										autoFocus
										type="password"
										onChange={(e) =>
											handleChangePin(e.target.value)
										}
									/>
								</div>
								<button disabled={pin.trim() === ''} type="button" onClick={() => handleIdentifyAsAdminButton()}>Identify</button>
							</div>
							<div className="message">
								Once you identify as admin with your PIN, you
								will see edit/add/delete buttons next to which
								you will have to enter your PIN each time you
								use them.
							</div> 
						</>
					) : (
						<div className="messageLoggedIn">
								<div>PIN is correct.<br/><br/>You are identified as admin.<br /><br />Each time you want to change data on this site, you will have to type in your PIN again in the input box next to the appropriate button.</div>
								<button type="button" onClick={handleLogoutButton}>Logout</button>
						</div>
					)}
				</fieldset>
			</form>
		</div>
	);
};
