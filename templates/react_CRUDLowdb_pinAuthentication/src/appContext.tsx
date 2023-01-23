import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { createContext } from 'react';
import axios from 'axios';
import {
	IJob,
	IBackendJob,
	ITodo,
	ISkillTotal,
	IJobEditItem,
	blankJob,
} from './interfaces';
import { cloneDeep } from 'lodash-es';
import { toast } from 'react-toastify';

interface IAppContext {
	jobs: IJob[];
	todos: ITodo[];
	skillTotals: ISkillTotal[];
	handleToggleSkillTotal: (skillTotal: ISkillTotal) => void;
	handleDeleteJob: (job: IJob) => void;
	handleChangePin: (value: string) => void;
	handleChangeFormField: (
		value: string,
		job: IJob,
		fieldIdCode: string
	) => void;
	handleToggleEditStatus: (job: IJob) => void;
	handleToggleAddStatus: () => void;
	handleSaveEditedJob: (job: IJob) => void;
	handleSaveAddedJob: () => void;
	anyJobIsBeingEdited: () => boolean;
	isAdding: boolean;
	toggleAddingForm: () => void;
	pin: string;
	addingJob: IJob;
	setPin: Dispatch<SetStateAction<string>>;
	prePageLoad: () => void;
	isAdmin: boolean;
	handleIdentifyAsAdminButton: () => void;
	handleLogoutButton: () => void;
}

interface IAppProvider {
	children: React.ReactNode;
}

const notify = (message: string) => toast(message);

const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const AppContext = createContext<IAppContext>({} as IAppContext);

export const AppProvider: React.FC<IAppProvider> = ({ children }) => {
	const [jobs, setJobs] = useState<IJob[]>([]);
	const [todos, setTodos] = useState<ITodo[]>([]);
	const [skillTotals, setSkillTotals] = useState<ISkillTotal[]>([]);
	const [isAdding, setIsAdding] = useState(false);
	const [addingJob, setAddingJob] = useState(cloneDeep(blankJob));
	const [pin, setPin] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	const loadJobs = async () => {
		const rawJobs = (await axios.get(`${backendUrl}/jobs`)).data;
		const _jobs: IJob[] = [];
		rawJobs.forEach((rawJob: IBackendJob) => {
			const _job: IJob = {
				...rawJob,
				userIsEditing: false,
				editItem: {
					id: rawJob.id,
					title: rawJob.title,
					company: rawJob.company,
					url: rawJob.url,
					description: rawJob.description,
					skillList: rawJob.skillList,
					todo: rawJob.todo,
				},
			};
			_jobs.push(_job);
		});
		setJobs(_jobs);
	};
	const loadTodos = async () => {
		(async () => {
			const _todos = (await axios.get(`${backendUrl}/todos`)).data;
			_todos.sort((a: ITodo, b: ITodo) => a.todoText > b.todoText);
			setTodos(_todos);
		})();
	};
	const loadSkillTotals = async () => {
		const _skillTotals: ISkillTotal[] = (
			await axios.get(`${backendUrl}/skillTotals`)
		).data;
		_skillTotals.sort(
			(a: ISkillTotal, b: ISkillTotal) =>
				Number(b.total) - Number(a.total)
		);
		_skillTotals.forEach((_skillTotal) => {
			_skillTotal.isOpen = false;
			if (_skillTotal.skill.name) {
				_skillTotal.lookupInfoLink = `https://www.google.com/search?client=firefox-b-d&q=web+development+${_skillTotal.skill.name}`;
			} else {
				_skillTotal.lookupInfoLink = `https://www.google.com/search?client=firefox-b-d&q=web+development+${_skillTotal.skill.idCode}`;
			}
		});
		setSkillTotals(_skillTotals);
	};

	useEffect(() => {
		(async () => {
			await loadJobs();
		})();
	}, []);
	useEffect(() => {
		(async () => {
			await loadTodos();
		})();
	}, []);
	useEffect(() => {
		(async () => {
			await loadSkillTotals();
		})();
	}, []);

	const handleToggleSkillTotal = (skillTotal: ISkillTotal) => {
		skillTotal.isOpen = !skillTotal.isOpen;
		setSkillTotals([...skillTotals]);
	};

	const handleChangeFormField = (
		value: string,
		job: IJob,
		fieldIdCode: string
	) => {
		job.editItem[fieldIdCode as keyof IJobEditItem] = value;
		setJobs([...jobs]);
	};

	const handleDeleteJob = async (job: IJob) => {
		try {
			const res = await axios.delete(`${backendUrl}/jobs/${job.id}`, {
				headers: {
					'Content-Type': 'application/json',
				},
				data: {
					pin,
				},
			});

			if (res.status === 200) {
				await loadJobs();
				await loadTodos();
				await loadSkillTotals();
				setPin('');
			} else {
				console.log(res);
			}
		} catch (e: any) {
			const message = e.response.data.message;
			notify(message);
			if (message) {
				console.error(`ERROR: ${message}`);
			}
			setPin('');
		}
	};

	const handleToggleEditStatus = (job: IJob) => {
		job.userIsEditing = !job.userIsEditing;
		job.editItem = {
			id: job.id,
			title: job.title,
			company: job.company,
			url: job.url,
			description: job.description,
			skillList: job.skillList,
			todo: job.todo,
		};
		setJobs([...jobs]);
	};

	const handleToggleAddStatus = () => {
		setAddingJob(cloneDeep(blankJob));
		setIsAdding(!isAdding);
	};

	const handleSaveEditedJob = async (job: IJob) => {
		try {
			const res = await axios.patch(
				`${backendUrl}/job`,
				{
					job: job.editItem,
					pin,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (res.status === 200) {
				await loadJobs();
				await loadTodos();
				await loadSkillTotals();
			} else {
				console.log(res);
			}
			job.userIsEditing = !job.userIsEditing;
			setPin('');
		} catch (e: any) {
			const message = e.response.data.message;
			notify(message);
			setPin('');
		}
	};

	const handleSaveAddedJob = async () => {
		try {
			const res = await axios.post(
				`${backendUrl}/job`,
				{
					job: addingJob.editItem,
					pin,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			if (res.status === 200) {
				await loadJobs();
				await loadTodos();
				await loadSkillTotals();
			} else {
				console.log(res);
			}
			notify(`Job "${addingJob.editItem.title}" added.`);
			setAddingJob(cloneDeep(blankJob));
			setIsAdding(false);
			setPin('');
		} catch (e: any) {
			const message = e.response.data.message;
			notify(message);
			setPin('');
		}
	};

	const anyJobIsBeingEdited = () => {
		// jobs.forEach((job) => {
		for (const job of jobs) {
			if (job.userIsEditing) {
				console.log('true');
				return true;
			}
		}
		return false;
	};

	const toggleAddingForm = () => {
		setIsAdding(!isAdding);
	};

	const handleChangePin = (pin: string) => {
		setPin(pin);
	};

	const prePageLoad = () => {
		setPin('');
	};

	const handleIdentifyAsAdminButton = async () => {
		try {
			const res = await axios.post(
				`${backendUrl}/identify-as-admin`,
				{
					pin,
				},
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			if (res.status === 200) {
				setIsAdmin(true);
				await loadJobs();
				await loadTodos();
				await loadSkillTotals();
				setPin('');
			} else {
				notify(`There was an error.`);
				console.log(res);
			}
		} catch (e: any) {
			const message = e.response.data.message;
			notify(message);
			setPin('');
		}
	};

	const handleLogoutButton = () => {
		setIsAdmin(false);
		setPin('');
	};
	return (
		<AppContext.Provider
			value={{
				jobs,
				todos,
				skillTotals: skillTotals,
				handleToggleSkillTotal: handleToggleSkillTotal,
				handleDeleteJob,
				handleChangeFormField,
				handleToggleEditStatus,
				handleToggleAddStatus,
				handleSaveEditedJob,
				handleSaveAddedJob,
				anyJobIsBeingEdited,
				isAdding,
				toggleAddingForm,
				pin,
				addingJob,
				handleChangePin,
				setPin,
				prePageLoad,
				isAdmin,
				handleIdentifyAsAdminButton,
				handleLogoutButton,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};
