# React/Node/Express frontend/backend with admin authentication

This is the minimal starting point for a basic React-frontend with Node/Express-backend with has authentication. Use this starter if you plan to create a backend that has POST, PUT, PATCH or DELETE routes which you need to protect on your backend and need to be able to allow a user on the frontend to log log in with password in order to access those routes. Authentication is done with session/cookies and kept as simple as possible, i.e. only one user (admin) can log in who then has admin rights on the front and backend for a specific amount of time, set at 10 seconds in order to test it first. The admin is able to edit a welcome message which in the backend is stored in a text file, so there is no database set up. You'll have to delete what you don't need and add what you need, but quite a bit of configuration and implementation details is set up for you on as boilerplate that works. Frontend is Vite React with Sass, React Router, useContext and a CLI command to create pages (`npm run cp`), while the backend is a minimal Node/Express but with a simple MVC structure with `server.ts` which calls a corresponding function in `model.ts`. This is a good project if you want to build a multi-page application that has CRUD operations and will b be hosted online.

![grafik](https://starters.tanguay.eu/images/starters/reactNodeSimpleAdminAuth.png)

## features


- **frontend:** 
  - Vite/React 
  - Sass
  - TypeScript
  - ES6 modules
  - React Router
  - useContext
  - admin login with password
- **backend:** 
  - Node/Express 
  - TypeScript 
  - ES6 modules
  - simple MVC Structure (`server.ts`/`model.ts`)
  - cookie/session authentication

## install

- go to your projects directory
- create a directory called `site001`

## install backend

- go to your projects directory
- `cd site001`
- `git clone git@github.com:edwardtanguay/react-node-simple-admin-auth-backend.git site001-backend`
- `npm i`
- `npm run dev`

## install frontend

- go to your projects directory
- `cd site001`
- `git clone git@github.com:edwardtanguay/react-node-simple-admin-auth-backend.git site001-frontend`
- `npm i`
- `npm run dev`

## more starters, templates and frameworks

https://starters.tanguay.eu
