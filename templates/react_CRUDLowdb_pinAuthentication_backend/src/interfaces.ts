export interface IJob {
	id: number;
	title: string;
	company: string;
	url: string;
	description: string;
	skillList: string;
	skills: ISkill[];
	todo: string;
}

export interface ISkill {
	idCode: string;
	name: string;
	url: string;
	description: string;
}

export interface ITodo {
	todoText: string;
	company: string;
	title: string;
	url: string;
}

export interface ISkillTotal {
	skill: ISkill;
	total: number;
}

export const nullObjectSkill = {
	idCode: '',
	name: '',
	url: '',
	description: ''
}

export interface IEditedJob {
	id: number,
	title: string;
	company: string;
	url: string;
	description: string;
	skillList: string;
	todo: string;
}

export interface IAddedJob {
	title: string;
	company: string;
	url: string;
	description: string;
	skillList: string;
	todo: string;
}