import { useEffect } from 'react';
import create from 'zustand';
import axios from 'axios';
import { IJob, ISkill } from './interfaces';

const jobsUrl = 'https://edwardtanguay.vercel.app/share/jobs.json';
const skillsUrl = 'https://edwardtanguay.vercel.app/share/skills.json';

interface IStore {
	appTitle: string;
	loadJobs: () => void;
	loadSkills: () => void;
	jobs: IJob[];
	skills: ISkill[];
}

export const useStore = create<IStore>(
	(set): IStore => ({
		appTitle: 'Info Site',
		loadJobs: async () => {
			const _jobs = (await axios.get(jobsUrl)).data;
			set((state) => {
				const _state = { ...state };
				_state.jobs = _jobs;
				return _state;
			});
		},
		loadSkills: async () => {
			const _skills = (await axios.get(skillsUrl)).data;
			set((state) => {
				const _state = { ...state };
				_state.skills = _skills;
				return _state;
			});
		},
		jobs: [],
		skills: [],
	})
);

export const LoadStore = () => {
	const store = useStore((state) => state);

	useEffect(() => {
		store.loadJobs();
		store.loadSkills();
	}, []);

	return <></>;
};
