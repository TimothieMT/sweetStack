import { useContext, useRef } from 'react';
import { AppContext } from '../AppContext';
import { IFlashcard } from '../interfaces';

interface IProps {
	flashcard: IFlashcard;
}

export const Flashcard = ({ flashcard }: IProps) => {
	const {
		handleToggleFlashcard,
		handleDeleteFlashcard,
		handleEditFlashcard,
		handleCancelEditFlashcard,
		handleSaveEditFlashcard,
		handleConfirmDeleteFlashcard,
		handleFlashcardFieldChange,
		handleCancelDeleteFlashcard,
		adminIsLoggedIn,
	} = useContext(AppContext);

	const categoryRef = useRef() as React.RefObject<HTMLInputElement>;

	const prehandleEditFlashcard = (flashcard: IFlashcard) => {
		handleEditFlashcard(flashcard);
		setTimeout(() => {
			if (categoryRef.current !== null) {
				categoryRef.current.focus();
			}
		},100);
	};

	const handleKeyDown = (key: string, flashcard: IFlashcard) => {
		if (key === 'Enter') {
			handleSaveEditFlashcard(flashcard);
		}
	};

	return (
		<div className="flashcardWrapper">
			{!flashcard.isBeingEdited && (
				<div className="flashcard">
					<div
						className="front"
						onClick={() => handleToggleFlashcard(flashcard)}
					>
						<span className="category">
							{flashcard.category.toUpperCase()}:
						</span>{' '}
						{flashcard.front}
					</div>
					{flashcard.isOpen && (
						<div
							className="back"
							dangerouslySetInnerHTML={{
								__html: flashcard.backHtml,
							}}
						></div>
					)}
				</div>
			)}
			{adminIsLoggedIn && (
				<>
					{flashcard.isBeingEdited && (
						<div className="editArea">
							<form>
								<div className="row rowCategory">
									<label>Category</label>
									<div className="control">
										<input
											value={
												flashcard.originalItem.category
											}
											ref={categoryRef}
											onKeyDown={(e) =>
												handleKeyDown(e.key, flashcard)
											}
											onChange={(e) =>
												handleFlashcardFieldChange(
													'category',
													flashcard,
													e.target.value
												)
											}
											type="text"
										/>
									</div>
								</div>
								<div className="row">
									<label>Front</label>
									<div className="control">
										<input
											value={flashcard.originalItem.front}
											onKeyDown={(e) =>
												handleKeyDown(e.key, flashcard)
											}
											onChange={(e) =>
												handleFlashcardFieldChange(
													'front',
													flashcard,
													e.target.value
												)
											}
											type="text"
										/>
									</div>
								</div>
								<div className="row">
									<label>Back</label>
									<div className="control">
										<input
											value={flashcard.originalItem.back}
											onKeyDown={(e) =>
												handleKeyDown(e.key, flashcard)
											}
											onChange={(e) =>
												handleFlashcardFieldChange(
													'back',
													flashcard,
													e.target.value
												)
											}
											type="text"
										/>
									</div>
								</div>
							</form>
						</div>
					)}
					{!flashcard.isBeingEdited && !flashcard.isBeingDeleted && (
						<div className="adminArea">
							<button
								onClick={() =>
									prehandleEditFlashcard(flashcard)
								}
							>
								Edit
							</button>
							<button
								onClick={() => handleDeleteFlashcard(flashcard)}
							>
								Delete
							</button>
						</div>
					)}
					{flashcard.isBeingEdited && (
						<div className="editAdminArea">
							<button
								onClick={() =>
									handleCancelEditFlashcard(flashcard)
								}
							>
								Cancel
							</button>
							<button
								onClick={() =>
									handleSaveEditFlashcard(flashcard)
								}
							>
								Save
							</button>
						</div>
					)}
					{flashcard.isBeingDeleted && (
						<div className="deleteAdminArea">
							<div className="question">
								Are you sure you want to delete this flashcard?
							</div>
							<button
								onClick={() =>
									handleCancelDeleteFlashcard(flashcard)
								}
							>
								Cancel
							</button>
							<button
								onClick={() =>
									handleConfirmDeleteFlashcard(flashcard)
								}
							>
								YES, DELETE
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
};
