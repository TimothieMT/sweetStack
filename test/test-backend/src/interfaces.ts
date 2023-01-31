import { Types } from 'mongoose';

export interface INewBook {
	title: string,
	description: string,
	numberOfPages: number,
	language: string,
	imageUrl: string,
	buyUrl: string
}

export interface IBook extends INewBook{
	_id: string,
	languageText: string,
}

export interface IFrontendUser {
	_id: Types.ObjectId,
	username: string,
	firstName: string,
	lastName: string,
	accessGroups: string[]
}
