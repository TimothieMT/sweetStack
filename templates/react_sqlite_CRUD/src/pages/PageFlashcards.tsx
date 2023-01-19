import { useContext, useRef } from 'react';
import { AppContext } from '../AppContext';
import { Helmet } from 'react-helmet';
import { Flashcard } from '../components/Flashcard';
import { IOriginalFlashcard } from '../interfaces';

export const PageFlashcards = () => {
	const {
		appTitle,
		adminIsLoggedIn,
		flashcards,
		newFlashcard,
		flashcardIsBeingAdded,
		handleAddFlashcardFieldChange,
		handleCancelAddFlashcard,
		handleAddFlashcard,
		handleSaveNewFlashcard,
	} = useContext(AppContext);

	const newCategoryRef = useRef() as React.RefObject<HTMLInputElement>;

	const prehandleAddFlashcard = () => {
		handleAddFlashcard();
		setTimeout(() => {
			if (newCategoryRef.current !== null) {
				newCategoryRef.current.focus();
			}
		}, 100);
	};

	const handleKeyDown = (key: string) => {
		if (key === 'Enter') {
			handleSaveNewFlashcard();
		}
	};

	return (
		<div className="page pageFlashcards">
			<Helmet>
				<title>{appTitle} - Flashcards</title>
			</Helmet>

			{flashcardIsBeingAdded && (
				<>
					<h3 className="newFlashcard">New flashcard:</h3>
					<div className="addFlashcardArea">
						<form>
							<div className="row rowCategory">
								<label>Category</label>
								<div className="control">
									<input
										value={newFlashcard.category}
										onKeyDown={(e) => handleKeyDown(e.key)}
										ref={newCategoryRef}
										onChange={(e) =>
											handleAddFlashcardFieldChange(
												'category',
												newFlashcard,
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
										value={newFlashcard.front}
										onKeyDown={(e) => handleKeyDown(e.key)}
										onChange={(e) =>
											handleAddFlashcardFieldChange(
												'front',
												newFlashcard,
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
										value={newFlashcard.back}
										onKeyDown={(e) => handleKeyDown(e.key)}
										onChange={(e) =>
											handleAddFlashcardFieldChange(
												'back',
												newFlashcard,
												e.target.value
											)
										}
										type="text"
									/>
								</div>
							</div>
						</form>
					</div>

					<div className="newFlashcardAdminArea">
						<button onClick={handleCancelAddFlashcard}>
							Cancel
						</button>
						<button onClick={handleSaveNewFlashcard}>Save</button>
					</div>
				</>
			)}

			<div className="headerArea">
				<h3>There are {flashcards.length} flashcards:</h3>
				{adminIsLoggedIn && !flashcardIsBeingAdded && (
					<button onClick={prehandleAddFlashcard}>
						Add Flashcard
					</button>
				)}
			</div>
			<div className="flashcards">
				{flashcards.map((flashcard) => {
					return (
						<Flashcard key={flashcard.id} flashcard={flashcard} />
					);
				})}
			</div>
		</div>
	);
};
