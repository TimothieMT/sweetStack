import bcrypt from 'bcrypt';

const password = process.argv[2];

if (password === undefined) {
	console.log('SCRIPT: bcrypt');
	console.log('NAME: password-hash creator');
	console.log('-------------------------');
	console.log('EXAMPLE: npm run bcrypt mypassword');
	console.log('RESULT: bcrypt hash for "mypassword"');
	process.exit();
} else {
	const salt = await bcrypt.genSalt(12);
	const hash = await bcrypt.hash(password, salt);
	console.log(hash)
}