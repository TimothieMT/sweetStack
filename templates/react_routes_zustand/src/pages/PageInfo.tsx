import { useStore } from '../store';
import { Helmet } from 'react-helmet';

export const PageInfo = () => {
	const store = useStore((state) => state);

	return (
		<div className="pageInfo">
			<Helmet>
				<title>{store.appTitle} - Info</title>
			</Helmet>
			<div className="content">
				<div className="jobs">
					<h2>{store.jobs.length} Jobs</h2>
					{store.jobs.map(job => {
						return (
							<div className="job" key={job.id}>
								<div className="title">{job.title}</div>
							</div>
						)
					})}
				</div>
				<div className="skills">
					<h2>{store.skills.length} Skills</h2>
					{store.skills.map(skill => {
						return (
							<div className="skill" key={skill.name}>
								<div className="item"><span className="name">{skill.name}</span> - {skill.description}</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	);
};