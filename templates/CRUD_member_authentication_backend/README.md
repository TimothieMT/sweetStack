# Fullstack MERN site which allows multiple users to add/edit/delete items via CRUD API using MongoDB and TypeScript/ES6-Modules on frontend/backend

This starter is a base fullstack MERN site that allows you to have multiple users who can log into the site and see different pages (using React Router) and accomplish different tasks (e.g. admins can delete, edit and addd items). The backend is an API built on Node/Express saving data to a MongoDB database using Mongoose. ES6 modules and TypeScript are used on both backend and frontend (a React site created with Vite). Passwords are saved as hashes in the database with bcrypt. The app is simplified for learning purposes but is ready to use as a basis for any site that needs to have multiple users log in, view various data, and change data.

## features

- **frontend:**
  - Vite/React
  - Sass
  - TypeScript / ES6 modules
  - React Router
  - useContext
  - multiuser login with password
  - react-helmet
  - axios
  - lodash (cloneDeep)

- **backend:**
  - Node/Express
  - TypeScript / ES6 modules
  - simple MVC structure (`server.ts`/`model.ts`)
  - cookie/session authentication
  - MongoDB (local or Atlas)
  - Mongoose
  - bcrypt for hasing passwords
  - CLI command to create bcrypt hashes
  - authorization pattern: accessGroups with anonymousUser

## INSTALL BACKEND

### create database

- with MongoDB Compass, import the file `dev/books.json` into the collection `books`
- with MongoDB Compass, import the file `dev/users.json` into the collection `users`
- 
- you can also change the backend/frontend ports if you need to, e.g. to avoid conflicts


### start and test the backend

- `npm run dev`
- click on URL shown in the terminal (e.g. http://localhost:3210)
- click on `/books` link
- change data in your MongoDB database to see that the changes are reflected in the browser
- to test individual routes, see the `test.rest` file (you need the VSCode extension [Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client))

## INSTALL FRONTEND

### start the frontend

- `npm run dev`
- open in browser
- click url in terminal
