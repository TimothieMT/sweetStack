import { useContext } from 'react';
import { AppContext } from '../AppContext';

export const PageMembers = () => {
	const { memberInfo, currentUserIsInAccessGroup, getNoAccessMessage } = useContext(AppContext);

	return (
		<div className="page pageMembers">
			{currentUserIsInAccessGroup('members') ? (
				<>
					<h2>Welcome Members</h2>
					<p className="message">{memberInfo.message}</p>

					<h2>We currently have {memberInfo.members.length} members</h2>
					<ul>
						{memberInfo.members.map(member => {
							return (
								<li key={member._id}>{member.firstName} {member.lastName}
									{member.accessGroups.includes('unapprovedMembers') && (
										<span> - pending approval</span>
							)}	
								</li>
						)
					})}
					</ul>
				</>
			) : (
					<div className="noAccessMessage">{getNoAccessMessage()}</div>
			)}
		</div>
	);
};
