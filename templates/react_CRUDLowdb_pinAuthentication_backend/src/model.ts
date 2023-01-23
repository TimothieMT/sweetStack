import * as model from './model.js';
import { IJob, ISkill, nullObjectSkill, ISkillTotal, ITodo } from './interfaces.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { IEditedJob } from './interfaces.js';
import * as tools from './tools.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFile = join(__dirname, `../src/data/db.json`);
const adapter = new JSONFile(dbFile);
const db: any = new Low(adapter);
await db.read();

export const getApiInstructionsHtml = () => {
	return `
<style>
a, h1 {
	background-color: #ddd;
	font-family: courier;
}
</style>
<h1>GETAJOB API</h1>	
<ul>
	<li><a href="jobs">/jobs</a> - array of job listings will all fields</li>
	<li><a href="todos">/todos</a> - array of todos with todo/company/title fields</li>
	<li><a href="skillTotals">/skillTotals</a> - array of skills with totals how often they occur in job listings</li>
</ul>
	`;
}

export const getJobs = (): IJob[] => {
	const _jobs: IJob[] = db.data.jobs;
	const jobs: IJob[] = [];
	_jobs.forEach(_job => {
		const job = {
			..._job,
			skills: model.getSkillsWithList(_job.skillList)
		}
		jobs.push(job);
	})
	return jobs;
}

export const getTodos = (): ITodo[] => {
	const _jobs: IJob[] = db.data.jobs;
	return _jobs.map((job: IJob) => {
		return {
			todoText: job.todo,
			company: job.company,
			title: job.title,
			url: job.url
		}
	});
}

export const getSkillTotals = () => {
	const skillTotals: ISkillTotal[] = [];
	model.getJobs().forEach(job => {
		job.skills.forEach(skill => {
			const existingSkillTotal = skillTotals.find(skillTotal => skillTotal.skill.idCode === skill.idCode);
			if (!existingSkillTotal) {
				skillTotals.push({
					skill,
					total: 1
				});
			} else {
				existingSkillTotal.total++;
			}
		});
	})
	return skillTotals;
}

export const getSkillsWithList = (skillList: string) => {
	const skills: ISkill[] = [];
	const skillIdCodes = skillList.split(',').map(m => m.trim());
	skillIdCodes.forEach(skillIdCode => {
		const skill: ISkill = model.lookupSkill(skillIdCode);
		skills.push(skill);
	});
	return skills;
}

export const lookupSkill = (idCode: string): ISkill => {
	const skills: any = db.data.skills;
	const skill = skills.find((m: ISkill) => m.idCode === idCode);
	if (skill === undefined) {
		return {
			...nullObjectSkill,
			idCode
		}
	} else {
		return {
			...skill,
			idCode,
		}
	}
}

export const deleteJob = async (id: number) => {
	const deletedObject = db.data.jobs.find((m: IJob) => m.id === id);
	db.data.jobs = db.data.jobs.filter((m: IJob) => m.id !== id);
	await db.write();
	return deletedObject;
}

export const saveEditedJob = async (editedJob: IEditedJob) => {
	const job: IJob = db.data.jobs.find((m: IJob) => m.id === editedJob.id);

	job.title = editedJob.title;
	job.company = editedJob.company;
	job.url = editedJob.url;
	job.description = editedJob.description;
	job.skillList = editedJob.skillList;
	job.todo = editedJob.todo;

	await db.write();
	return job;
}

export const saveAddedJob = async (addedJob: IEditedJob) => {
	const totalBefore = db.data.jobs.length;
	addedJob.id = tools.getNextId(db.data.jobs);
	db.data.jobs.push(addedJob);
	await db.write();
	const totalAfter = db.data.jobs.length;
	return totalAfter === totalBefore + 1;
}
