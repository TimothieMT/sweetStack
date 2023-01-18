import { useContext, useEffect } from 'react';
import { AppContext } from '../appContext';
import '../styles/pageSkills.scss';

export const PageSkills = () => {
	const {
		skillTotals,
		handleToggleSkillTotal,
		prePageLoad,
	} = useContext(AppContext);

	useEffect(() => {
		prePageLoad();
	},[]);

	return (
		<div className="page pageSkills">
			<h2>Skills</h2>
			<div className="skillTotals">
				{skillTotals.map((skillTotal, i) => {
					return (
						<div
							key={i}
							className={`skillTotal ${
								skillTotal.skill.name ? 'found' : 'missing'
							}`}
						>
							<div
								className="mainArea"
								onClick={() =>
									handleToggleSkillTotal(skillTotal)
								}
							>
								<span className="total">
									{skillTotal.total}x
								</span>{' '}
								{skillTotal.skill.name ? (
									<span className="name">
										{skillTotal.skill.name}
									</span>
								) : (
									<span className="name">
										{skillTotal.skill.idCode}
									</span>
								)}
							</div>
							{skillTotal.isOpen && (
								<div className="openArea">
									{skillTotal.skill.name ? (
										<div className="description">
											{skillTotal.skill.description}{' '}
											<a
												href={skillTotal.skill.url}
												target="_blank"
											>
												info
											</a>{' '}
											<a
												href={
													skillTotal.lookupInfoLink
												}
												target="_blank"
											>
												lookup
											</a>
										</div>
									) : (
										<div className="description">
											create new entry in backend:
											<br />
											\src\data\skills.json
											<br />
											<a
												href={
													skillTotal.lookupInfoLink
												}
												target="_blank"
											>
												lookup
											</a>
										</div>
									)}
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};
