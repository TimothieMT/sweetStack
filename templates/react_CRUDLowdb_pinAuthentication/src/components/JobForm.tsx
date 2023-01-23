import { useContext } from 'react';
import { AppContext } from '../appContext';
import { IJob, FormAction } from '../interfaces';
import { JobFormRowLine } from './JobFormRowLine';
import { JobFormRowParagraph } from './JobFormRowParagraph';

interface IProps {
	job: IJob;
	formAction: FormAction;
}

export const JobForm = ({ job, formAction }: IProps) => {
	const {
		handleToggleEditStatus,
		handleSaveEditedJob,
		handleToggleAddStatus,
		handleSaveAddedJob,
		handleChangePin,
		pin,
	} = useContext(AppContext);

	return (
		<form className={formAction.toString()}>
			<fieldset>
				{formAction === FormAction.Edit && <legend>Editing Job</legend>}
				{formAction === FormAction.Add && <legend>Adding Job</legend>}

				<JobFormRowLine
					label="Title"
					fieldIdCode="title"
					value={job.editItem.title}
					job={job}
				/>
				<JobFormRowLine
					label="Company"
					fieldIdCode="company"
					value={job.editItem.company}
					job={job}
				/>
				<JobFormRowLine
					label="URL"
					fieldIdCode="url"
					value={job.editItem.url}
					job={job}
				/>
				<JobFormRowParagraph
					label="Description"
					fieldIdCode="description"
					value={job.editItem.description}
					job={job}
				/>
				<JobFormRowLine
					label="Skill List"
					fieldIdCode="skillList"
					value={job.editItem.skillList}
					job={job}
				/>
				<JobFormRowLine
					label="Next Todo"
					fieldIdCode="todo"
					value={job.editItem.todo}
					job={job}
				/>

				<div className="buttonRow">
					{formAction === FormAction.Edit ? (
						<>
							<button
								type="button"
								onClick={() => handleToggleEditStatus(job)}
							>
								Clear
							</button>
							<div className="saveButtonArea">
								<input
									placeholder="PIN"
									type="password"
									value={pin}
									onChange={(e) =>
										handleChangePin(e.target.value)
									}
								/>
								<button
									disabled={pin.trim() === ''}
									type="button"
									onClick={() => handleSaveEditedJob(job)}
								>
									Save
								</button>
							</div>
						</>
					) : (
						<>
							<button
								type="button"
								onClick={() => handleToggleAddStatus()}
							>
								Clear
							</button>
							<div className="saveButtonArea">
								<input
									placeholder="PIN"
									type="password"
									value={pin}
									onChange={(e) =>
										handleChangePin(e.target.value)
									}
								/>
								<button
									disabled={pin.trim() === ''}
									type="button"
									className="save"
									onClick={() => handleSaveAddedJob()}
								>
									Save
								</button>
							</div>
						</>
					)}
				</div>
			</fieldset>
		</form>
	);
};
