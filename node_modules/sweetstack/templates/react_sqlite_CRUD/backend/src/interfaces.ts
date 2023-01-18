export interface INewFlashcard {
	category: string;
	front: string;
	back: string;
}

export interface IFlashcard extends INewFlashcard {
	id: number;
}
