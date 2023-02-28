import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	username: String,
	hash: String,
	firstName: String,
	lastName: String,
	accessGroups: [String],
	email: String,
	confirmationCode: String
});

export const User = mongoose.model('user', userSchema);
