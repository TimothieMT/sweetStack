# Fullstack React frontend which adds/edits/deletes items in backend SQLite CRUD API

This is the starting point for the simplest fullstack CRUD site that has a database. There is a React-frontend which allows the user to view, edit, delete and add flashcards, which are saved via a Node/Express-backend to an SQLite database (a `db.sqlite` file on the backend. The authentication is simply an admin password stored in an `.env` file in the backend. So there is only one user (admin) which logs in simply by typing a password on the frontend, and if correct, can edit/delete/add flashcard items. The UX is quite advanced: animated toaster notifications, forms allow Enter to save, forms appear with cursors focused in the first input field, and all access to backend will gracefully fail if there is a network error, e.g. if you stop the backend, the site will show a spinner for two seconds before displaying a message that the database is currently unavailable. All connection to the backend is done in useContext fo course. This is a good project if you want to build a fullstack application which has quite complete UX and frontend/backend communication, would be e.g. easy to swap out the SQLite database for MySQL, Postgres, MongoDB or even a Lowdb JSON file.

![grafik](https://starters.tanguay.eu/images/starters/fullstackReactSqliteCrud.png)

## features

- **frontend:** 
	- Vite/React 
	- Sass
	- TypeScript
	- ES6 modules
	- React Router
	- useContext
	- admin login with password
	- [react-toastify](https://www.npmjs.com/package/react-toastify) notifications
	- UX features:
		- forms have automatically focused cursors
		- in forms, Enter means Save
		- graceful fail on network error (when backend not present)
- **backend:** 
	- Node/Express 
	- TypeScript 
	- ES6 modules
	- simple MVC structure (`server.ts`/`model.ts`)
	- cookie/session authentication
	- SQLite database (file: `data/db.sqlite`)

## install

- open your terminal
- create a directory for this project, e.g.
	- `mkdir site001`

## install backend

- enter your project directory
	- `cd site001`
- create backend directory
	- `git clone git@github.com:edwardtanguay/fullstack-react-sqlite-crud-backend.git site001-backend`
- open VSCode in the backend directory
	- `code site001-backend`
- open VSCode terminal
- delete old and create new Git repository
	- `rm -rf .git`
	- `git npm -b main`
	- make initial commit
- create `.env` file with **any random characters** for the session secret, and an **admin password** you can remember

```text
SESSION_SECRET = ksks2374skjdf
ADMIN_PASSWORD = pass828
```

- install node_modules
	- `npm i`
- start the backend
	- `npm run dev`
- open API in browser
	- click url in terminal
- to distinguish your backend VSCode from your frontend VSCode, set the frame color
	- you need the [VSCode Peacock extension](https://marketplace.visualstudio.com/items?itemName=johnpapa.vscode-peacock)
	- **F1**
	- "Peacock: Enter a Color"
	- `navy` (**b**lue for **b**ackend)

## install frontend

- enter your project directory
	- `cd site001`
- create frontend directory
	- `git clone git@github.com:edwardtanguay/fullstack-react-sqlite-crud-backend.git site001-frontend`
- open VSCode in the frontend directory
	- `code site001-frontend`
- open VSCode terminal
- delete old and create new Git repository
	- `rm -rf .git`
	- `git npm -b main`
	- make initial commit
- no `.env` file is necessary for the frontend
- install node_modules
	- `npm i`
- start the backend
	- `npm run dev`
- open in browser
	- click url in terminal
- to distinguish your frontend VSCode from your backend VSCode, set the frame color
	- you need the [VSCode Peacock extension](https://marketplace.visualstudio.com/items?itemName=johnpapa.vscode-peacock)
	- **F1**
	- "Peacock: Enter a Color"
	- `purple` (**f**uchsia for **f**rontend)

## more starters, templates and frameworks

https://starters.tanguay.eu
