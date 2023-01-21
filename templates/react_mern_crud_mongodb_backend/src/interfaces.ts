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