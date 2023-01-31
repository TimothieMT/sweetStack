import dotenv from 'dotenv';

dotenv.config();

export const APP_NAME = process.env.APP_NAME;

export const SECONDS_TILL_SESSION_TIMEOUT = Number(process.env.SECONDS_TILL_SESSION_TIMEOUT);

export const PORT = process.env.PORT;

export const MONGODB_CONNECTION = process.env.MONGODB_CONNECTION;

export const SESSION_SECRET = process.env.SESSION_SECRET;

export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export const FRONTEND_URL = process.env.FRONTEND_URL;

export const NODE_ENVIRONMENT = process.env.NODE_ENVIRONMENT;