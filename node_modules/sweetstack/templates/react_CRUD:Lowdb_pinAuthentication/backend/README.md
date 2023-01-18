# Frontend/Backend MERN CRUD app with Lowdb and PIN authentication

This is a fullstack MERN frontend/backend example app which has all the moving parts for you to deploy an application online to e.g. Hetzner which allows users who know the admin PIN to edit, delete and add new items online. This is a good basis to study, learn and use if you have React/Node/Express skills but not yet database or auth security skills. It has everything you need to publish an online website in which users can identify themselves and change content online. Note that if you want to build a job-application management app, this is a useful basis which can be used as is. Otherwise you will have to replace the content with your own.

![grafik](https://starters.tanguay.eu/images/starters/frontBackMernCrudLowdbPin.png)

## features

- **frontend:** Vite/React with Sass, TypeScript and ES6 modules
- **backend:** Node/Express with TypeScript and ES6 modules
- **database:** [Lowdb](https://www.npmjs.com/package/lowdb) (one JSON file in backend)
- **authentication:** simple PIN which is an environment variable in the backend, i.e. all POST/PATCH/DELETE backend routes are protected
- **toastify notifications**: easy-to-implement app messages that pop out with animation in e.g. upper-right-hand corner, see [react-toastify](https://www.npmjs.com/package/react-toastify)

## install

- go to your projects directory
- create a directory called `getajob`

## install backend

- go to your projects directory
- `cd getajob`
- `git clone git@github.com:edwardtanguay/getajob007-backend.git`
- `npm i`
- create **.env** file

```text
PORT = 3001
PIN = 1234
```

- `npm run dev`

## install frontend

- go to your projects directory
- `cd getajob`
- `git clone git@github.com:edwardtanguay/getajob007-frontend.git`
- `npm i`
- create **.env** file

```text
VITE_BACKEND_URL = http://localhost:3001
```

- `npm run dev`

## more starters, templates and frameworks

https://starters.tanguay.eu
