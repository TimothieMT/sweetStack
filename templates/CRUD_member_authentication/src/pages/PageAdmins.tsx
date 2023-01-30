import { useContext } from 'react';
import { AppContext } from '../AppContext';

export const PageAdmins = () => {
	const {
		adminInfo,
		currentUserIsInAccessGroup,
		getNoAccessMessage,
		handleApproveMember,
	} = useContext(AppContext);

	return (
		<div className="page pageAdmins">
			{currentUserIsInAccessGroup('members') ? (
				<>
					<h2>ADMIN AREA</h2>
					<p className="message">{adminInfo.message}</p>

					<table>
						<thead>
							<tr>
								<th>first name</th>
								<th>last name</th>
								<th>access groups</th>
							</tr>
						</thead>
						<tbody>
							{adminInfo.members.map((member) => {
								return (
									<tr key={member._id}>
										<td>{member.firstName}</td>
										<td>{member.lastName}</td>
										<td className="accessGroups">
											{member.accessGroups
												.filter(
													(m) =>
														![
															'unapprovedMembers',
															'loggedInUsers',
														].includes(m)
												)
												.join(', ')}
											{member.accessGroups.includes(
												'unapprovedMembers'
											) && (
												<button
													type="button"
													onClick={() =>
														handleApproveMember(
															member
														)
													}
												>
													approve as member
												</button>
											)}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</>
			) : (
				<div className="noAccessMessage">{getNoAccessMessage()}</div>
			)}
		</div>
	);
};
