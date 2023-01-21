export interface IJob {
	id: number;
	title: string;
	company: string;
	url: string;
	description: string;
	skillList: string;
	publicationDate: string;
}

export interface ISkill {
	idCode: string;
	name: string;
	url: string;
	description: string;
}