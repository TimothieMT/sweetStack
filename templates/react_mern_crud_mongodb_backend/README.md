# Fullstack MERN site which allows user to add/edit/delete items via CRUD API using MongoDB and TypeScript/ES6-Modules on frontend/backend

This starter is not only a good way to learn the basic skills of building a full-stack MERN site with admin login and item editing, but you can also use this site as a basis to create sites where you can log in as admin, edit/delete/add items and then log out again. Since it uses React, this is ideal for making an app-like site on your smart phone that you log into on the go to change and add information. There is only one user (admin), the password is saved in text in the backend .env file. In this way, the app is simplified for learning purposes but this site could be used for a wide range of personal or company and sites that need to have an admin keep the site up-to-date with new information.


## features

- **frontend:**
  - Vite/React
  - Sass
  - TypeScript / ES6 modules
  - React Router
  - useContext
  - admin login with password
  - react-helmet
  - axios

- **backend:**
  - Node/Express
  - TypeScript / ES6 modules
  - simple MVC structure (`server.ts`/`model.ts`)
  - cookie/session authentication
  - MongoDB (local or Atlas)
  - Mongoose

### create database

- create MongoDB database at your MongoDB Atlas called `bookapi`
- create a collection in it called `books`
- import the file `dev/books.json` into the collection `books` (e.g. with MongoDB Compass)

### create .env file for backend

- create a `.env` file in the root directory of your project
- copy in the following content
- replace all capitalized variables with appropriate data
  - USERNAME
  - PASSWORD
  - RANDOMSTRING
  - ADMINPASSWORD
- you can also change the backend/frontend ports if you need to

  ``` text
  APP_NAME = Book Site API
  SECONDS_TILL_SESSION_TIMEOUT = 3600 
  PORT = 5001
  MONGODB_CONNECTION = mongodb+srv://USERNAME:PASSWORD@cluster0.ogshn.mongodb.net/bookapi?retryWrites=true&w=majority
  SESSION_SECRET = RANDOMSTRING
  ADMIN_PASSWORD = ADMINPASSWORD
  FRONTEND_URL = http://localhost:5002
  NODE_ENVIRONMENT = development
  ```



