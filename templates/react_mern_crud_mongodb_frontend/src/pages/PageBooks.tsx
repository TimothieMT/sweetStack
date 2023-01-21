import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { Helmet } from 'react-helmet';

export const PageBooks = () => {
	const {
		appTitle,
		books,
		adminIsLoggedIn,
		handleDeleteBook,
		handleBookFieldChange,
		handleEditBook,
		handleCancelEditBook,
		handleSaveEditBook,
		isAdding,
		handleToggleAddBook,
		newBook,
		handleAddBookFieldChange,
		handleSaveNewBook,
	} = useContext(AppContext);

	return (
		<div className="pageBooks">
			<Helmet>
				<title>{appTitle} - Books</title>
			</Helmet>
			{books.length > 0 && <p>There are {books.length} books:</p>}

			{adminIsLoggedIn && (
				<>
					{!isAdding ? (
						<div className="addBookArea">
							<button onClick={() => handleToggleAddBook()}>
								Add Book
							</button>
						</div>
					) : (
						<fieldset className="addBookForm">
							<legend>Adding book</legend>
							<form>
								<div className="row">
									<label>Title</label>
									<div className="control">
										<input
											value={newBook.title}
											onChange={(e) =>
												handleAddBookFieldChange(
													'title',
													newBook,
													e.target.value
												)
											}
											type="text"
										/>
									</div>
								</div>
								<div className="row">
									<label>Description</label>
									<div className="control">
										<textarea
											value={newBook.description}
											onChange={(e) =>
												handleAddBookFieldChange(
													'description',
													newBook,
													e.target.value
												)
											}
										/>
									</div>
								</div>
								<div className="row">
									<label>Language</label>
									<div className="control">
										<input
											value={newBook.language}
											onChange={(e) =>
												handleAddBookFieldChange(
													'language',
													newBook,
													e.target.value
												)
											}
											type="text"
										/>
									</div>
								</div>

								<div className="buttonRow">
									<button
										onClick={() => handleToggleAddBook()}
									>
										Clear
									</button>
									<button
										type="button"
										onClick={handleSaveNewBook}
									>
										Save
									</button>
								</div>
							</form>
						</fieldset>
					)}
				</>
			)}
			<div className="books">
				{books.map((book) => {
					return (
						<div className="book" key={book._id}>
							<div className="imageWrapper">
								{book.imageUrl.trim() === '' ? (
									<img src="http://edwardtanguay.vercel.app/share/images/books/no-image.jpg" />
								) : (
									<img src={book.imageUrl} />
								)}
							</div>
							<div className="info">
								{!book.isBeingEdited ? (
									<div className="showDataArea">
										<div className="title">
											<a href={book.buyUrl}>
												{book.title}
											</a>
										</div>
										<div className="description">
											{book.description}
										</div>
										<div className="language">
											{book.languageText}
										</div>
										{adminIsLoggedIn && (
											<div className="buttonArea">
												<button
													type="button"
													onClick={() =>
														handleDeleteBook(book)
													}
												>
													Delete
												</button>
												<button
													type="button"
													onClick={() =>
														handleEditBook(book)
													}
												>
													Edit
												</button>
											</div>
										)}
									</div>
								) : (
									<div className="editArea">
										<form>
											<div className="row">
												<label>Title</label>
												<div className="control">
													<input
														value={
															book
																.originalEditFields
																.title
														}
														onChange={(e) =>
															handleBookFieldChange(
																'title',
																book,
																e.target.value
															)
														}
														type="text"
													/>
												</div>
											</div>
											<div className="row">
												<label>Description</label>
												<div className="control">
													<textarea
														value={
															book
																.originalEditFields
																.description
														}
														onChange={(e) =>
															handleBookFieldChange(
																'description',
																book,
																e.target.value
															)
														}
													/>
												</div>
											</div>
											<div className="row">
												<label>Language</label>
												<div className="control">
													<input
														value={
															book
																.originalEditFields
																.language
														}
														onChange={(e) =>
															handleBookFieldChange(
																'language',
																book,
																e.target.value
															)
														}
														type="text"
													/>
												</div>
											</div>
											<div className="editFormButtons">
												<button
													type="button"
													onClick={() =>
														handleCancelEditBook(
															book
														)
													}
												>
													Cancel
												</button>
												<button
													type="button"
													onClick={() =>
														handleSaveEditBook(book)
													}
												>
													Save
												</button>
											</div>
										</form>
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
