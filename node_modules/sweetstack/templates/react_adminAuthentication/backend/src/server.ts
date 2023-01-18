import session from 'express-session';
import express from 'express';
import cors from 'cors';
import * as model from './model.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import * as config from './config.js';

declare module 'express-session' {
	export interface SessionData {
		user: { [key: string]: any };
	}
}

dotenv.config();

const app = express();
app.use(cors({
	origin: ['http://localhost:3611'],
	methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
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

const authorizeUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
	if (req.session.user) {
		next();
	} else {
		res.status(401).send({});
	}
}

app.get('/', (req: express.Request, res: express.Response) => {
	res.send(model.getApiInstructions());
});

app.get('/welcomemessage', (req: express.Request, res: express.Response) => {
	res.send(model.getWelcomeMessage());
})

app.post('/welcomemessage', authorizeUser, (req: express.Request, res: express.Response) => {
	const { welcomeMessage } = req.body;
	model.saveWelcomeMessage(welcomeMessage);
	res.send({});
})

app.post('/login', (req: express.Request, res: express.Response) => {
	const password = req.body.password;
	if (password === process.env.ADMIN_PASSWORD) {
		req.session.user = 'admin' as any;
		req.session.cookie.expires = new Date(Date.now() + config.secondsTillTimeout * 1000);
		req.session.save();
		res.send('ok');
	} else {
		res.status(401).send({});
	}
});

app.get('/currentuser', (req: express.Request, res: express.Response) => {
	if (req.session.user) {
		res.send(req.session.user);
	} else {
		res.status(403).send({});
	}
});

app.get('/logout', (req, res) => {
	req.session.destroy((err) => {
		res.send('User logged out');
	});
});

app.listen(port, () => {
	console.log(`listening on port http://localhost:${port}`);
});