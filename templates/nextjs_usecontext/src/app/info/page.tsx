'use client';
import { useContext } from 'react';
import { AppContext } from '../../AppContext';

function Info() {
	const { siteTitle, jobs, skills } = useContext(AppContext);

	return (
		<div className="page pageInfo">
			<div>This is the info page for the site "{siteTitle}".</div>
			<div className="content">
				<div className="jobs">
					<h2>{jobs.length} Jobs</h2>
					{jobs.map((job) => {
						return (
							<div className="job" key={job.id}>
								<div className="title">{job.title}</div>
							</div>
						);
					})}
				</div>
				<div className="skills">
					<h2>{skills.length} Skills</h2>
					{skills.map((skill) => {
						return (
							<div className="skill" key={skill.name}>
								<div className="item">
									<span className="name">{skill.name}</span> -{' '}
									{skill.description}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default Info;
