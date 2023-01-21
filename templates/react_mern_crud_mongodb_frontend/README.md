# Fullstack MERN site which allows user to add/edit/delete items via CRUD API using MongoDB and TypeScript/ES6-Modules on frontend/backend

This starter is not only a good way to learn the basic skills of building a full-stack MERN site with admin login and item editing, but you can also use this site as a basis to create sites where you can log in as admin, edit/delete/add items and then log out again. Since it uses React, this is ideal for making an app-like site on your smart phone that you log into on the go to change and add information. There is only one user (admin), the password is saved in text in the backend .env file. In this way, the app is simplified for learning purposes but this site could be used for a wide range of personal or company and sites that need to have an admin keep the site up-to-date with new information.

![grafik](https://starters.tanguay.eu/images/starters/mernMongooseBookCrudFrontend.png)

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

## CREATE ONE PROJECT FOR BOTH BACKEND AND FRONTEND

- open your terminal
- create a directory for this project, e.g.
  - `mkdir et-mern-crud-site`

## INSTALL BACKEND

### set up directory and editor for backend

- enter your project directory
  - `cd et-mern-crud-site`
- create backend directory
  - `git clone git@github.com:edwardtanguay/et-mern-crud-site-backend.git et-mern-crud-site-backend`
- open VSCode in the backend directory
  - `code et-mern-crud-site-backend`
- open VSCode terminal
- delete old and create new Git repository
  - `rm -rf .git`
  - `git npm -b main`
  - make initial commit
- to distinguish your backend VSCode from your frontend VSCode, set the frame color
  - you need the [VSCode Peacock extension](https://marketplace.visualstudio.com/items?itemName=johnpapa.vscode-peacock)
  - **F1**
  - "Peacock: Enter a Color"
  - `navy` (**b**lue for **b**ackend)

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

### start the backend

- `npm run dev`

## INSTALL FRONTEND

### set up directory and editor for frontend

- enter your project directory
  - `cd et-mern-crud-site`
- create frontend directory
  - `git clone git@github.com:edwardtanguay/et-mern-crud-site-frontend.git et-mern-crud-site-frontend`
- open VSCode in the frontend directory
  - `code et-mern-crud-site-frontend`
- open VSCode terminal
- delete old and create new Git repository
  - `rm -rf .git`
  - `git npm -b main`
  - make initial commit
- to distinguish your frontend VSCode from your backend VSCode, set the frame color
  - you need the [VSCode Peacock extension](https://marketplace.visualstudio.com/items?itemName=johnpapa.vscode-peacock)
  - **F1**
  - "Peacock: Enter a Color"
  - `purple` (**f**uchsia for **f**rontend)

### create .env file for frontend

- create an `.env` file in the root directory of your project
- copy in the following content
- make sure the backend URL is correct, e.g. if you changed the port number of your backend, then change it here as well

  ``` text
  VITE_BACKEND_URL = http://localhost:5001
  ```
  
### start the frontend

- `npm run dev`
- open in browser
- click url in terminal

## DEPLOY BACKEND TO LINUX CLOUD SERVER AT HETZNER

- in your npm scripts, change all references of `et-mern-crud-site` to your site name

  ``` text
  "scripts": {
    "dev": "nodemon",
    "build": "tsc",
    "setup": "pm2 start --name et-mern-crud-site-backend npm -- start",
    "start": "node dist/server.js",
    "deploy": "git pull --no-rebase && npm i && npm run build && pm2 restart et-mern-crud-site-backend"
  },
  ```

- push your backend to a repository on GitHub
- SSH into your Hetzner account
- go to your web projects directory, e.g.
  - e.g. `/var/www`
- clone your repository there
  - e.g. `git clone git@github.com:edwardtanguay/et-mern-crud-site-backend.git`
- navigate into your backend project directory
  - e.g. `cd et-mern-crud-site-backend`
- set up `.env` file
  - replace all capitalized variables with appropriate data
    - USERNAME
    - PASSWORD
    - RANDOMSTRING
    - ADMINPASSWORD
  - change the FRONTEND_URL appropriately

  ``` text
  APP_NAME = Book Site API
  SECONDS_TILL_SESSION_TIMEOUT = 3600 
  PORT = 5001
  MONGODB_CONNECTION = mongodb+srv://USERNAME:PASSWORD@cluster0.ogshn.mongodb.net/bookapi?retryWrites=true&w=majority
  SESSION_SECRET = RANDOMSTRING
  ADMIN_PASSWORD = ADMINPASSWORD
  FRONTEND_URL = https://et-mern-crud-site.tanguay.eu
  NODE_ENVIRONMENT = production
  ```

- set up the site in pm2
  - `npm run setup`
- deploy your site
  - `npm run deploy`
- test that your application is running
  - in your firewall, add incoming rule for port 5001
  - in your browser, go to e.g. `http://tanguay.eu:5001` (not https)
  - you should see your backend running in the browser
  - in your firewall, remove the rule again
- set up a subdomain for your site, e.g. `et-mern-crud-site-backend.tanguay.eu`
- create nginx config file for your backend site
  - e.g. `/etc/nginx/conf.d/et-mern-crud-site-backend.conf`

    ``` text
    server {
            server_name et-mern-crud-site-backend.tanguay.eu;
            location / {
                    proxy_pass http://tanguay.eu:5001;
            }
    }
    ```

- register the https certificate for this subdomain
  - `sudo certbot --nginx`
  - choose the number of your site
- restart the nginx server
  - `sudo systemctl restart nginx`
- in your browser, go to your site at e.g. [https://et-mern-crud-site-backend.tanguay.eu](https://et-mern-crud-site-backend.tanguay.eu)

## DEPLOY FRONTEND TO LINUX CLOUD SERVER AT HETZNER

- in your npm scripts, change all references of `et-mern-crud-site` to your site name

  ``` text
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "cp": "node cli/cp.mjs",
    "setup": "pm2 start --name et-mern-crud-site-frontend npm -- start",
    "start": "vite preview --host --port 5002",
    "deploy": "git pull --no-rebase && npm i && npm run build && pm2 restart et-mern-crud-site-frontend"
  },
  ```

- push your frontend to a repository on GitHub
- SSH into your Hetzner account
- go to your web projects directory, e.g.
  - e.g. `/var/www`
- clone your repository there
  - e.g. `git clone git@github.com:edwardtanguay/et-mern-crud-site-frontend.git`
- navigate into your frontend project directory
  - e.g. `cd et-mern-crud-site-frontend`
- create a `.env` file with the URL of the backend that you just set up

  ``` text
  VITE_BACKEND_URL = https://et-mern-crud-site-backend.tanguay.eu
  ```

- set up the site in pm2
  - `npm run setup`
- deploy your site
  - `npm run deploy`
- test that your application is running
  - in your firewall, add incoming rule for port 5002
  - in your browser, go to e.g. `http://tanguay.eu:5002` (not https)
  - you should see your frontend running in the browser
  - in your firewall, remove the rule again
- set up a subdomain for your site, e.g. `et-mern-crud-site.tanguay.eu` (without `-frontend`)
- create nginx config file for your frontend site
  - e.g. `/etc/nginx/conf.d/et-mern-crud-site.conf` (without `-frontend`)

    ``` text
    server {
            server_name et-mern-crud-site.tanguay.eu;
            location / {
                    proxy_pass http://tanguay.eu:5002;
            }
    }
    ```

- register the https certificate for this subdomain
  - `sudo certbot --nginx`
  - choose the number of your site
- restart the nginx server
  - `sudo systemctl restart nginx`
- in your browser, go to your site at e.g. [https://et-mern-crud-site.tanguay.eu](https://et-mern-crud-site.tanguay.eu)

## more starters, templates and frameworks

https://starters.tanguay.eu
