var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
app.use(cors({
    origin: process.env.FRONTEND_BASE_URL,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}));
app.set('trust proxy', 1);
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production"
    }
}));
app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
app.get('/', (req, res) => {
    res.status(500).send('no access -- 222');
});
const ensureSafeOrigin = (req, res, next) => {
    var _a;
    try {
        const safeOriginCode = (_a = req.body) === null || _a === void 0 ? void 0 : _a.safeOriginCode;
        if (safeOriginCode !== process.env.SAFE_ORIGIN_CODE) {
            res.status(500).send('no access: safeOrigin failed');
        }
        else {
            next();
        }
    }
    catch (e) {
        res.status(500).send('no access: something went wrong in ensureSafeOrigin');
    }
};
const protectSiteFromHacking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User.find();
        const numberOfUsersInData = users.length;
        if (numberOfUsersInData > 20) {
            res.status(500).send('hacker protection: too many users in database');
        }
        else {
            next();
        }
    }
    catch (e) {
        res.status(500).send('no access: something went wrong in ensureSafeOrigin');
    }
});
const loginSecondsMax = 10;
const logAnonymousUserIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({ username: 'anonymousUser' });
    if (user) {
        req.session.user = user;
        req.session.cookie.expires = new Date(Date.now() + loginSecondsMax * 1000);
        req.session.save();
        res.send({
            "currentUser": user
        });
    }
    else {
        res.status(500).send('bad login');
    }
});
const logUserIn = (username, password, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({ username });
    if (user) {
        const passwordIsCorrect = yield bcrypt.compare(password, user.hash);
        if (passwordIsCorrect) {
            req.session.user = user;
            req.session.cookie.expires = new Date(Date.now() + loginSecondsMax * 1000);
            req.session.save();
            res.send({
                "currentUser": user
            });
        }
        else {
            logAnonymousUserIn(req, res);
        }
    }
    else {
        logAnonymousUserIn(req, res);
    }
});
app.post('/login', ensureSafeOrigin, (req, res) => {
    var _a, _b;
    try {
        const username = (_a = req.body) === null || _a === void 0 ? void 0 : _a.username;
        const password = (_b = req.body) === null || _b === void 0 ? void 0 : _b.password;
        logUserIn(username, password, req, res);
    }
    catch (e) {
        res.status(500).send('no access: something went wrong');
    }
});
app.post('/register', [ensureSafeOrigin, protectSiteFromHacking], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            const salt = yield bcrypt.genSalt();
            const hash = yield bcrypt.hash(password, salt);
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
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.send({
                message: 'user created', user: {
                    username, firstName, lastName, email
                },
                errors
            });
        }
        else {
            res.send({ message: 'failed validation', errors });
        }
    }
    catch (e) {
        res.status(500).send('no access');
    }
}));
app.get('/current-user', (req, res) => {
    setTimeout(() => {
        const user = req.session.user;
        if (user) {
            res.send({
                "currentUser": user
            });
        }
        else {
            logAnonymousUserIn(req, res);
        }
    }, 0); // increase to test initial backend delay 
});
app.get('/logout', (req, res) => {
    logAnonymousUserIn(req, res);
});
app.post('/confirm-registration-code', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const confirmationCode = req.body.confirmationCode;
    const user = yield User.findOne({ confirmationCode });
    if (user) {
        user.accessGroups = ['loggedInUsers', 'members'];
        user.save();
        req.session.user = user;
        req.session.cookie.expires = new Date(Date.now() + loginSecondsMax * 1000);
        req.session.save();
        res.send({ userWasConfirmed: true });
    }
    else {
        res.send({ userWasConfirmed: false });
    }
}));
app.listen(PORT, () => {
    console.log(`listening on port http://localhost:${PORT}`);
});
