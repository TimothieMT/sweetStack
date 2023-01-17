export interface IOriginalFlashcard {
	category: string;
	front: string;
	back: string;
}

export interface IRawFlashcard extends IOriginalFlashcard {
	id: number;
}

export interface IFlashcard extends IRawFlashcard {
	isOpen: boolean;
	backHtml: string;
	isBeingEdited: boolean;
	isBeingDeleted: boolean;
	originalItem: IOriginalFlashcard;
}

export const blankNewFlashcard: IOriginalFlashcard = {
	category: '',
	front: '',
	back: ''
}