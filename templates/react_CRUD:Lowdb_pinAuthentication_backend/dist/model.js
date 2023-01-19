import * as model from './model.js';
import { nullObjectSkill } from './interfaces.js';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import * as tools from './tools.js';
const __dirname = dirname(fileURLToPath(import.meta.url));
const dbFile = join(__dirname, `../src/data/db.json`);
const adapter = new JSONFile(dbFile);
const db = new Low(adapter);
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
};
export const getJobs = () => {
    const _jobs = db.data.jobs;
    const jobs = [];
    _jobs.forEach(_job => {
        const job = {
            ..._job,
            skills: model.getSkillsWithList(_job.skillList)
        };
        jobs.push(job);
    });
    return jobs;
};
export const getTodos = () => {
    const _jobs = db.data.jobs;
    return _jobs.map((job) => {
        return {
            todoText: job.todo,
            company: job.company,
            title: job.title,
            url: job.url
        };
    });
};
export const getSkillTotals = () => {
    const skillTotals = [];
    model.getJobs().forEach(job => {
        job.skills.forEach(skill => {
            const existingSkillTotal = skillTotals.find(skillTotal => skillTotal.skill.idCode === skill.idCode);
            if (!existingSkillTotal) {
                skillTotals.push({
                    skill,
                    total: 1
                });
            }
            else {
                existingSkillTotal.total++;
            }
        });
    });
    return skillTotals;
};
export const getSkillsWithList = (skillList) => {
    const skills = [];
    const skillIdCodes = skillList.split(',').map(m => m.trim());
    skillIdCodes.forEach(skillIdCode => {
        const skill = model.lookupSkill(skillIdCode);
        skills.push(skill);
    });
    return skills;
};
export const lookupSkill = (idCode) => {
    const skills = db.data.skills;
    const skill = skills.find((m) => m.idCode === idCode);
    if (skill === undefined) {
        return {
            ...nullObjectSkill,
            idCode
        };
    }
    else {
        return {
            ...skill,
            idCode,
        };
    }
};
export const deleteJob = async (id) => {
    const deletedObject = db.data.jobs.find((m) => m.id === id);
    db.data.jobs = db.data.jobs.filter((m) => m.id !== id);
    await db.write();
    return deletedObject;
};
export const saveEditedJob = async (editedJob) => {
    const job = db.data.jobs.find((m) => m.id === editedJob.id);
    job.title = editedJob.title;
    job.company = editedJob.company;
    job.url = editedJob.url;
    job.description = editedJob.description;
    job.skillList = editedJob.skillList;
    job.todo = editedJob.todo;
    await db.write();
    return job;
};
export const saveAddedJob = async (addedJob) => {
    const totalBefore = db.data.jobs.length;
    addedJob.id = tools.getNextId(db.data.jobs);
    db.data.jobs.push(addedJob);
    await db.write();
    const totalAfter = db.data.jobs.length;
    return totalAfter === totalBefore + 1;
};
//# sourceMappingURL=model.js.map