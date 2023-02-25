// TEST: changed at Hetzner
import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from './models/User.js';
import { createTransport } from 'nodemailer';
import * as tools from './tools.js';

dotenv.config();
mongoose.connect(process.env.MONGODB_URI);

declare module 'express-session' {
	export interface SessionData {
		user: { [key: string]: any };
	}
}

const transporter = createTransport({
	service: 'gmail',
	auth: {
		user: process.env.MAILER_ACCOUNT_NAME,
		pass: process.env.MAILER_ACCOUNT_PASSWORD,
	},
});

const app = express();
const PORT = process.env.PORT || 3045;

app.use(express.json());
app.use(
	cors({
		origin: process.env.FRONTEND_BASE_URL,
		methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
		credentials: true
	})
);
app.set('trust proxy', 1);

app.use(cookieParser());

app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: process.env.SESSION_SECRET,
		cookie: {
			httpOnly: true,
			sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
			secure: process.env.NODE_ENV === "production"
		}
	})
);

app.all('/', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:5173");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});


app.get('/', (req: express.Request, res: express.Response) => {
	res.status(500).send('no access -- 222');
});

const ensureSafeOrigin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		const safeOriginCode = req.body?.safeOriginCode;
		if (safeOriginCode !== process.env.SAFE_ORIGIN_CODE) {
			res.status(500).send('no access: safeOrigin failed');
		} else {
			next();
		}
	}
	catch (e) {
		res.status(500).send('no access: something went wrong in ensureSafeOrigin');
	}
}

const protectSiteFromHacking = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
	try {
		const users = await User.find();
		const numberOfUsersInData = users.length;
		if (numberOfUsersInData > 20) {
			res.status(500).send('hacker protection: too many users in database');
		} else {
			next();
		}
	}
	catch (e) {
		res.status(500).send('no access: something went wrong in ensureSafeOrigin');
	}
}

const loginSecondsMax = 10;

const logAnonymousUserIn = async (req: express.Request, res: express.Response) => {
	const user = await User.findOne({ username: 'anonymousUser' });
	if (user) {
		req.session.user = user;
		req.session.cookie.expires = new Date(Date.now() + loginSecondsMax * 1000);
		req.session.save();
		res.send({
			"currentUser": user
		});
	} else {
		res.status(500).send('bad login');
	}
}

const logUserIn = async (username: string, password: string, req: express.Request, res: express.Response) => {
	const user = await User.findOne({ username });
	if (user) {
		const passwordIsCorrect = await bcrypt.compare(
			password,
			user.hash
		);
		if (passwordIsCorrect) {
			req.session.user = user;
			req.session.cookie.expires = new Date(Date.now() + loginSecondsMax * 1000);
			req.session.save();
			res.send({
				"currentUser": user
			});
		} else {
			logAnonymousUserIn(req, res);
		}
	} else {
		logAnonymousUserIn(req, res);
	}
}

app.post('/login', ensureSafeOrigin, (req: express.Request, res: express.Response) => {
	try {
		const username = req.body?.username;
		const password = req.body?.password;
		logUserIn(username, password, req, res);
	}
	catch (e) {
		res.status(500).send('no access: something went wrong');
	}
});

app.post('/register', [ensureSafeOrigin, protectSiteFromHacking], async (req: express.Request, res: express.Response) => {
	try {
		const username = req.body.username;
		const password = req.body.password;
		const firstName = req.body.firstName;
		const lastName = req.body.lastName;
		const email = req.body.email;
		const confirmationCode = tools.getRandomConfirmationCode();

		// validation
		const errors = [];
		if (username.length < 2) {
			errors.push('username must be 2 or more characters');
		}
		if (password.length < 2) {
			errors.push('password must be 2 or more characters');
		}
		if (firstName.length < 2) {
			errors.push('first name must be 2 or more characters');
		}
		if (lastName.length < 2) {
			errors.push('last name must be 2 or more characters');
		}
		if (!tools.emailIsValid(email)) {
			errors.push('email must be valid');
		}
		if (errors.length === 0) {
			// generate hash from password
			const salt = await bcrypt.genSalt();
			const hash = await bcrypt.hash(password, salt);

			const user = new User({
				username,
				hash,
				firstName,
				lastName,
				accessGroups: ['loggedInUsers', 'unconfirmedMembers'],
				email,
				confirmationCode
			});

			// save user to database
			// TODO: catch all possible errors in registration process here
			// TODO: e.g. if user fails to save to database, don't send mail
			user.save();

			// send confirmation email to user
			const confirmUrl = `${process.env.FRONTEND_BASE_URL}/confirm-registration/${confirmationCode}`;
			const mailOptions = {
				from: `Language Tandem Site <${process.env.MAILER_ACCOUNT_NAME}@gmail.com>`,
				to: email,
				subject: 'Please confirm your registration',
				html: `
	<h1>Thank you for your registration!</h1>
	<p>We appreciate your membership!</p>
	<p>Please click here to confirm your registration: <a href="${confirmUrl}">${confirmUrl}</a></p>
	`,
			};
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log(error);
				} else {
					console.log('Email sent: ' + info.response);
				}
			});


			res.send({
				message: 'user created', user: {
					username, firstName, lastName, email
				},
				errors
			});
		} else {
			res.send({ message: 'failed validation', errors });
		}
	}
	catch (e) {
		res.status(500).send('no access');
	}
});

app.get('/current-user', (req: express.Request, res: express.Response) => {
	setTimeout(() => {
		const user = req.session.user;
		if (user) {
			res.send({
				"currentUser": user
			});
		} else {
			logAnonymousUserIn(req, res);
		}
	}, 0); // increase to test initial backend delay 
});

app.get('/logout', (req: express.Request, res: express.Response) => {
	logAnonymousUserIn(req, res);
});

app.post('/confirm-registration-code', async (req: express.Request, res: express.Response) => {
	const confirmationCode = req.body.confirmationCode;
	const user = await User.findOne({ confirmationCode });
	if (user) {
		user.accessGroups = ['loggedInUsers', 'members'];
		user.save();
		req.session.user = user;
		req.session.cookie.expires = new Date(Date.now() + loginSecondsMax * 1000);
		req.session.save();
		res.send({ userWasConfirmed: true })
	} else {
		res.send({ userWasConfirmed: false })
	}
});

app.listen(PORT, () => {
	console.log(`listening on port http://localhost:${PORT}`);
});
