import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
	title: String,
	description: String,
	numberOfPages: Number,
	language: String,
	imageUrl: String,
	buyUrl: String
});

export const Book = mongoose.model('book', bookSchema);