#!/usr/bin/env node

//IMPORTS
import inquirer from "inquirer";
import {Command} from "commander";
import fs from 'fs';
import {join} from 'path'
import {copyFile} from 'fs/promises'
import * as path from "path";
import {fileURLToPath} from 'url';
import chalk from "chalk";

//VARIABLES
const app = new Command();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const name = 'sweetstack'

//REQUESTS
const questions = [
    {type: "input", name: 'name', message: chalk.hex('#a08c95').bold('project name:')},
    {
        type: "list",
        name: 'frontend',
        choices: [chalk.hex('#A7C7E7')('react'), chalk.green('vue'), chalk.hex('#ff7247')('angular')],
        message: chalk.hex('#a08c95').bold('selected frontend: ')
    },
    {type: "list", name: 'backend', choices: ['yes', 'no'], message: chalk.hex('#a08c95').bold('need a backend? ')},
    {
        type: "input",
        name: 'path',
        message: chalk.hex('#a08c95').bold('please enter the path to "/../node_modules" folder: ')
    }
]

//COPY A FILE

async function copyAFile(from, to) {
    try {
        await copyFile(from, to);
    } catch (err) {
        console.log(chalk.red(`no such file or directory, copyfile '${from}' -> '${to}'`));
    }
}

//COPY ALL FILES
async function copyAll(fromDir, toDir, filePaths) {
    return Promise.all(filePaths.map(filePath => {
        return copyAFile(join(fromDir, filePath), join(toDir, filePath));
    }));
}

//EXPRESS BACKEND
function expressBackend(from, to, answers) {

    fs.mkdirSync(to + "/backend")
    fs.mkdirSync(to + "/backend/dist")
    fs.mkdirSync(to + "/backend/src")

    copyAll(
        `${from}/templates/express-backend`,
        `${to}/backend`,
        ["nodemon.json", "package.json", "package-lock.json", "tsconfig.json"],
    ).then(r => r);
    copyAll(
        `${from}/templates/express-backend/dist`,
        `${to}/backend/dist`,
        ["server.js", "server.js.map"],
    ).then(r => r);
    copyAll(
        `${from}/templates/express-backend/src`,
        `${to}/backend/src`,
        ["server.ts"],
    ).then(r => r);
    console.log(chalk.green(`react backend successfully!
            
            cd ${answers.name}
            cd backend
            npm install
            npm run start`))
}

function angularBackend(from, to, answers) {
    //CREATE ANGULAR BACKEND
    fs.mkdirSync(to)
    fs.mkdirSync(to + "/backend")
    fs.mkdirSync(to + "/backend/public")
    fs.mkdirSync(to + "/backend/src")
    fs.mkdirSync(to + '/backend/src/app')
    fs.mkdirSync(to + '/backend/src/assets')

    copyAll(
        `${from}/templates/angular-frontend`,
        `${to}/backend`,
        ['angular.json', 'package.json', 'package-lock.json', 'README.md', 'tsconfig.app.json', 'tsconfig.spec.json', 'tsconfig.json'],
    ).then(r => r);
    copyAll(
        `${from}/templates/angular-frontend/src`,
        `${to}/backend/src`,
        ['styles.sass', 'index.html', 'favicon.ico', 'main.ts'],
    ).then(r => r);
    copyAll(
        `${from}/templates/angular-frontend/src/assets`,
        `${to}/backend/src/assets`,
        ['.gitkeep'],
    ).then(r => r);
    copyAll(
        `${from}/templates/backend-components`,
        `${to}/backend/src/app`,
        ['app.component.html', 'app.component.sass', 'app.component.backend.ts', 'app.module.backend.ts', 'app-routing.module.ts'],
    ).then(r => r);

    console.log(chalk.green(`angular backend successfully!
            
            cd ${answers.name}
            cd backend
            npm install
            ng serve`))
}

function reactFrontend(from, to, answers) {
    //CREATE REACT FRONTEND

    fs.mkdirSync(to)
    fs.mkdirSync(to + "/frontend")
    fs.mkdirSync(to + "/frontend/src")
    fs.mkdirSync(to + "/frontend/public")

    copyAll(
        `${from}/templates/react-frontend`,
        `${to}/frontend`,
        ['package.json', 'index.html', 'package-lock.json', 'tsconfig.json', 'tsconfig.node.json', 'vite.config.ts'],
    ).then(r => r);
    copyAll(
        `${from}/templates/react-frontend/src`,
        `${to}/frontend/src`,
        ['App.scss', 'App.tsx', 'index.css', 'main.tsx', 'vite-env.d.ts'],
    ).then(r => r);

    console.log(chalk.green(`react frontend successfully!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
}

function vueFrontend(from, to, answers) {
    //CREATE VUE FRONTEND

    fs.mkdirSync(to)
    fs.mkdirSync(to + "/frontend")
    fs.mkdirSync(to + "/frontend/src")
    fs.mkdirSync(to + "/frontend/public")
    fs.mkdirSync(to + "/frontend/src/assets")
    fs.mkdirSync(to + "/frontend/src/components")
    fs.mkdirSync(to + "/frontend/src/components/icons")
    fs.mkdirSync(to + "/frontend/src/router")
    fs.mkdirSync(to + "/frontend/src/views")

    copyAll(
        `${from}/templates/vue-frontend`,
        `${to}/frontend`,
        ['env.d.ts', 'index.html', 'package.json', 'package-lock.json', 'README.md', 'tsconfig.config.json', 'tsconfig.json', 'vite.config.ts'],
    ).then(r => r);
    copyAll(
        `${from}/templates/vue-frontend/src`,
        `${to}/frontend/src`,
        ['App.vue', 'main.ts'],
    ).then(r => r);
    copyAll(
        `${from}/templates/vue-frontend/src/assets`,
        `${to}/frontend/src/assets`,
        ['base.css', 'logo.svg', 'main.css'],
    ).then(r => r);
    copyAll(
        `${from}/templates/vue-frontend/src/components`,
        `${to}/frontend/src/components`,
        ['HelloWorld.vue', 'TheWelcome.vue', 'WelcomeItem.vue'],
    ).then(r => r);
    copyAll(
        `${from}/templates/vue-frontend/src/components/icons`,
        `${to}/frontend/src/components/icons`,
        ['IconCommunity.vue', 'IconDocumentation.vue', 'IconEcosystem.vue', 'IconSupport.vue', 'IconTooling.vue'],
    ).then(r => r);
    copyAll(
        `${from}/templates/vue-frontend/src/router`,
        `${to}/frontend/src/router`,
        ['index.ts'],
    ).then(r => r);
    copyAll(
        `${from}/templates/vue-frontend/src/views`,
        `${to}/frontend/src/views`,
        ['AboutView.vue', 'HomeView.vue'],
    ).then(r => r);

    console.log(chalk.green(`vue backend successfully!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
}

function angularFrontend(from, to, answers) {
    //CREATE ANGULAR FRONTEND

    fs.mkdirSync(to)
    fs.mkdirSync(to + "/frontend")
    fs.mkdirSync(to + "/frontend/src")
    fs.mkdirSync(to + "/frontend/public")
    fs.mkdirSync(to + '/frontend/src/app')
    fs.mkdirSync(to + '/frontend/src/assets')

    copyAll(
        `${from}/templates/angular-frontend`,
        `${to}/frontend`,
        ['angular.json', 'package.json', 'package-lock.json', 'README.md', 'tsconfig.app.json', 'tsconfig.spec.json', 'tsconfig.json'],
    ).then(r => r);
    copyAll(
        `${from}/templates/angular-frontend/src`,
        `${to}/frontend/src`,
        ['styles.sass', 'index.html', 'favicon.ico', 'main.ts'],
    ).then(r => r);
    copyAll(
        `${from}/templates/angular-frontend/src/assets`,
        `${to}/frontend/src/assets`,
        ['.gitkeep'],
    ).then(r => r);
    copyAll(
        `${from}/templates/angular-frontend/src/app`,
        `${to}/frontend/src/app`,
        ['app.component.html', 'app.component.sass', 'app.component.ts', 'app.module.ts', 'app-routing.module.ts'],
    ).then(r => r);

    console.log(chalk.green(`angular backend successfully!
            
            cd ${answers.name}
            cd frontend
            npm install
            ng serve`))
}

//CREATE FUNCTION
const createProject = () => {

    inquirer.prompt(questions).then(((answers) => {

        const absolutePath = `${answers.path}/${name}/`
        const destPath = `${path.resolve()}/${answers.name}`


        if (answers.name !== '' && answers['frontend'] === chalk.hex('#A7C7E7')('react') && answers['backend'] === 'yes') {
            expressBackend(absolutePath, destPath, answers)
        }
        if (answers.name !== '' && answers['frontend'] === chalk.green('vue') && answers['backend'] === 'yes') {
            expressBackend(absolutePath, destPath, answers)
        }
        if (answers.name !== '' && answers['frontend'] === chalk.hex('#ff7247')('angular') && answers['backend'] === 'yes') {
            angularBackend(absolutePath, destPath, answers)
        }

        if (answers.name !== '' && answers['frontend'] === chalk.hex('#A7C7E7')('react') && answers['backend'] === 'no') {
            reactFrontend(absolutePath, destPath, answers)
        }

        if (answers.name !== '' && answers['frontend'] === chalk.green('vue') && answers['backend'] === 'no') {
            vueFrontend(absolutePath, destPath, answers)
        }

        if (answers.name !== '' && answers['frontend'] === chalk.hex('#ff7247')('angular') && answers['backend'] === 'no') {
            angularFrontend(absolutePath, destPath, answers)
        }
    }))
}

//INIT PROJECT
app
    .action(createProject)
app.parse(process.argv);