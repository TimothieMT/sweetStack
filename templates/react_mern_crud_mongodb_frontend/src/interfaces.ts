export interface IOriginalEditFields {
	title: string,
	description: string,
	language: string
}

export interface IBook {
	_id: string,
	title: string,
	description: string,
	numberOfPages: number,
	language: string,
	languageText: string,
	imageUrl: string,
	buyUrl: string,
	isBeingEdited: boolean
	originalEditFields: IOriginalEditFields
}

export const blankNewBook: IOriginalEditFields = {
	title: '',
	description: '',
	language: ''
}