import { IUser } from '../interfaces';
interface IPageMembersProps {
	currentUser: IUser;
}

export const PageMembers = (props: IPageMembersProps) => {
	const { currentUser } = props;
	return (
		<>
			{currentUser.accessGroups.includes('unconfirmedMembers') && (
				<>
					<p>Hello {currentUser.firstName}, you are one step away from becoming a member!</p>
					<p>Please check your mail and click on the confirmation link.</p>
				</>
			)}
			{currentUser.accessGroups.includes('members') && (
				<>
					<h2>Member-Only Information</h2>
					<p>
						This is information that only confirmed members can see.
					</p>
				</>
			)}
		</>
	);
};
