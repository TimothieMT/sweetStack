import { useContext } from 'react';
import { AppContext } from '../appContext';
import { IJob } from '../interfaces';

interface IProps {
	label: string;
	fieldIdCode: string;
	value: string;
	job: IJob;
}

export const JobFormRowParagraph = ({
	label,
	fieldIdCode,
	value,
	job,
}: IProps) => {
	const { handleChangeFormField } = useContext(AppContext);

	return (
		<div className="row">
			<label>{label}</label>
			<div>
				<textarea
					value={value}
					onChange={(e) =>
						handleChangeFormField(e.target.value, job, fieldIdCode)
					}
				/>
			</div>
		</div>
	);
};
