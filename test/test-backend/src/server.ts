import session from 'express-session';
import express from 'express';
import cors from 'cors';
import * as model from './model.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import * as config from './config.js';
import { INewFlashcard } from './interfaces.js';

declare module 'express-session' {
	export interface SessionData {
		user: { [key: string]: any };
	}
}

dotenv.config();

const app = express();
app.use(cors({
	origin: 'http://localhost:3611',
	methods: ['POST', 'GET', 'DELETE', 'PUT'],
	credentials: true
}));
app.use(cookieParser());
app.use(express.json());
const port = config.port;

app.use(
	session({
		resave: true,
		saveUninitialized: true,
		secret: process.env.SESSION_SECRET,
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

app.get('/flashcards', (req: express.Request, res: express.Response) => {
	res.json(model.getFlashcards());
});

app.post('/login', (req: express.Request, res: express.Response) => {
	const { password } = req.body;
	if (password === process.env.ADMIN_PASSWORD) {
		req.session.user = 'admin' as any;
		req.session.cookie.expires = new Date(Date.now() + config.secondsTillTimeout * 1000);
		req.session.save();
		res.status(200).send('ok');
	} else {
		res.status(401).send({});
	}
});

app.get('/get-current-user', (req: express.Request, res: express.Response) => {
	if (req.session.user) {
		res.send(req.session.user);
	} else {
		res.send('anonymousUser');
	}
});

// PROTECTED ROUTES

const authorizeUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	if (req.session.user === 'admin' as any) {
		next();
	} else {
		res.status(401).send({});
	}
}

app.post('/flashcard', authorizeUser, (req: express.Request, res: express.Response) => {
	const flashcard = req.body.flashcard;
	const result = model.addFlashcard(flashcard)
	res.json(result);
});

app.put('/flashcard/:id', authorizeUser, (req: express.Request, res: express.Response) => {
	const id = Number(req.params.id);
	const newFlashcard: INewFlashcard = req.body.flashcard;
	if (isNaN(id)) {
		res.status(400).send({
			error: true,
			message: "sent string as id, should be number"
		});
	} else {
		const result = model.editFlashcard(id, newFlashcard);
		res.json(result);
	}
});

app.delete('/flashcard/:id', authorizeUser, (req: express.Request, res: express.Response) => {
	const id = Number(req.params.id);
	if (isNaN(id)) {
		res.status(400).send({
			error: true,
			message: "sent string, should be number"
		});
	} else {
		const result = model.deleteFlashcard(id);
		res.json(result);
	}
});

app.get('/logout', authorizeUser, (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			res.send('ERROR');
		} else {
			res.send('logged out');
		}
	});
});

// SERVER 

app.listen(port, () => {
	console.log(`listening on port http://localhost:${port}`);
});