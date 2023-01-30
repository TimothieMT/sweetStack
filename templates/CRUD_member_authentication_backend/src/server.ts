import * as model from './model.js';
import express from 'express';
import cors from 'cors';
import * as config from './config.js';
import { IFrontendUser, INewBook } from './interfaces.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import * as tools from './tools.js';
import { setTimeout } from 'timers';

declare module 'express-session' {
	export interface SessionData {
		user: { [key: string]: any };
	}
}

const app = express();
app.use(express.json());
app.use(cors({
	origin: config.FRONTEND_URL,
	methods: ['POST', 'GET', 'DELETE', 'PUT', 'PATCH', 'OPTIONS', 'HEAD'],
	credentials: true
}));
app.use(cookieParser());
app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: config.SESSION_SECRET,
		cookie: {
			httpOnly: true,
			sameSite: 'lax',
			secure: false
		}
	})
);

// PUBLIC ROUTES

app.get('/', (req: express.Request, res: express.Response) => {
	res.send(model.getApiInstructions());
});

app.get('/books', async (req, res) => {
	const books = await model.getBooks();
	res.status(200).json(books);
});

app.get('/book/:id', async (req, res) => {
	const _id = req.params.id;
	const book = await model.getBook(_id);
	res.status(200).json(book);
});

app.post('/login', async (req: express.Request, res: express.Response) => {
	const { username, password } = req.body;
	const user = await model.getUser(username, password);
	if (user !== null) {
		const passwordIsCorrect = await tools.passwordIsCorrect(password, user.hash);
		if (passwordIsCorrect) {
			const frontendUser = {
				_id: user._id,
				username: user.username,
				firstName: user.firstName,
				lastName: user.lastName,
				accessGroups: user.accessGroups
			}
			req.session.user = frontendUser as IFrontendUser;
			req.session.cookie.expires = new Date(Date.now() + config.SECONDS_TILL_SESSION_TIMEOUT * 1000);
			req.session.save();
			res.status(200).send(frontendUser);
		} else {
			const anonymousUser = await model.getAnonymousUser();
			res.status(200).send(anonymousUser);
		}
	} else {
		const anonymousUser = await model.getAnonymousUser();
		res.status(200).send(anonymousUser);
	}
});

app.get('/get-current-user', async (req: express.Request, res: express.Response) => {
	if (req.session.user) {
		res.send(req.session.user);
	} else {
		const anonymousUser = await model.getAnonymousUser();
		res.status(200).send(anonymousUser);
	}
});

app.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			res.send('ERROR');
		} else {
			res.send('logged out');
		}
	});
});


// PROTECTED ROUTES

const authorizeOnlyIfAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	if (req.session.user && req.session.user.accessGroups.includes('admins') as any) {
		next();
	} else {
		res.status(401).send({});
	}
}

const authorizeOnlyIfMember = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	if (req.session.user && req.session.user.accessGroups.includes('members') as any) {
		next();
	} else {
		res.status(401).send({});
	}
}

const authorizeOnlyIfUnapprovedMember = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	if (req.session.user && req.session.user.accessGroups.includes('unapprovedMembers') as any) {
		next();
	} else {
		res.status(401).send({});
	}
}

app.get('/get-member-info', authorizeOnlyIfMember, async (req, res) => {
	const members = await model.getMembers();
	const memberInfo = {
		message: "This is information that only **members** can see. Note that it is not loaded when the site initially loads, but only after the user has been identified (either at login or on page reload while session is still alive) and only when that user has **members** in their list of accessGroups.",
		members
	}
	res.status(200).json(memberInfo);
});

app.get('/get-admin-info', authorizeOnlyIfAdmin, async (req, res) => {
	const members = await model.getMembers();
	const memberInfo = {
		message: "This is information that only **admins** can see. Note that it is not loaded when the site initially loads, but only after the user has been identified (either at login or on page reload while session is still alive) and only when that user has **admins** in their list of accessGroups.",
		members
	}
	res.status(200).json(memberInfo);
});

app.get('/get-unapproved-member-info', authorizeOnlyIfUnapprovedMember, async (req, res) => {
	const memberInfo = {
		message: "Your membership form has been received. When confirmed, you will have access to this page."
	}
	res.status(200).json(memberInfo);
});

app.patch('/approve-member', authorizeOnlyIfAdmin, async (req, res) => {
	const _id: string = req.body;
	const result = await model.approveMember(_id);
	res.status(200).send(result);
});

app.post('/book', authorizeOnlyIfAdmin, async (req, res) => {
	const book: INewBook = req.body;
	const result = await model.addBook(book);
	res.status(200).send(result);
});

app.put('/book/:id', authorizeOnlyIfAdmin, async (req, res) => {
	const _id = req.params.id;
	const book: INewBook = req.body;
	const result = await model.replaceBook(_id, book);
	res.status(200).json({
		oldBook: result.oldBook,
		result: result.newBook
	});
});

app.delete('/book/:id', authorizeOnlyIfAdmin, async (req, res) => {
	const _id = req.params.id;
	const result = await model.deleteBook(_id);
	res.status(200).json(result);
});

app.listen(config.PORT, () => {
	console.log(`${config.APP_NAME} is listening on port http://localhost:${config.PORT}`);
});