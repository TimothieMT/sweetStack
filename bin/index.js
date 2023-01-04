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
    {type: "list", name: 'backend', choices: ['yes', 'no'], message: chalk.hex('#a08c95').bold('need a backend? ')}
]

//COPY A FILE
async function copyAFile(from, to) {
    try {
        await copyFile(from, to);
    } catch (err) {
        console.error(`${err.message}`);
    }
}

//COPY ALL FILES
async function copyAll(fromDir, toDir, filePaths) {
    return Promise.all(filePaths.map(filePath => {
        return copyAFile(join(fromDir, filePath), join(toDir, filePath));
    }));
}

//ABSOLUTE PATH TO THE NODE_MODULES FOLDER
function absPath() {

    let result = ''

    const winPath1 = `${path.parse(process.cwd()).root}/Users/${process.env.USERNAME}/AppData/Roaming/npm/node_modules/${name}/`
    const winPath2 = `${path.parse(process.cwd()).root}/Program Files/nodejs/node_modules/${name}/`
    const linuxPath1 = `${path.parse(process.cwd()).root}/lib/node_modules/${name}/`
    const linuxPath2 = `${path.parse(process.cwd()).root}/home/${process.env.USERNAME}/.nvm/versions/node/${process.version}/lib/node_modules/${name}/`
    const macPath1 = `${path.parse(process.cwd()).root}/usr/local/lib/node_modules/${name}/`

    try {
        switch (process.platform) {
            case 'win32':
                if (process.platform === 'win32' && fs.existsSync(winPath1)) {
                    result = winPath1
                } else {
                    result = winPath2
                }
                break;
            case 'linux':
                if (process.platform === 'linux' && fs.existsSync(linuxPath1)) {
                    result = linuxPath1
                } else {
                    result = linuxPath2
                }
                break
            case 'darwin':
                result = macPath1
                break;
            default: {
                console.log(chalk.red('your platform is not supported'))
            }
        }
    } catch (err) {
        console.error('working system not supported' + err)
    }

    return result.toString()
}

//EXPRESS BACKEND
function expressBackend(from, to, name) {

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
            
            cd ${name}
            cd backend
            npm install
            npm run start`))
}
function reactFrontend (from, to, answers) {
    //CREATE REACT FRONTEND
    if (answers.name !== '' && answers['frontend'] === chalk.hex('#A7C7E7')('react')) {

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
}
function vueFrontend(from, to, answers) {
    //CREATE VUE FRONTEND
    if (answers.name !== '' && answers['frontend'] === chalk.green('vue')) {

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
}
function angularFrontend(from, to, answers) {
    //CREATE ANGULAR FRONTEND
    if (answers.name !== '' && answers['frontend'] === chalk.hex('#ff7247')('angular')) {


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
}

//CREATE FUNCTION
const createProject = () => {

    inquirer.prompt(questions).then(((answers) => {

        let absolutePath = absPath()
        const destPath = `${path.resolve()}/${answers.name}`

        if (copyAFile) {

            console.log(chalk.red('Path not found'))

            inquirer.prompt({
                type: "input",
                name: 'path',
                message: chalk.hex('#a08c95').bold('please enter the path to "/../node_modules" folder manually: ')
            }).then ((answer) => {

            absolutePath = `${answer.path}/${name}/`

            //CREATE FRONTEND RECAT VUE AND ANGULAR
            reactFrontend(absolutePath, destPath, answers)
            vueFrontend(absolutePath, destPath, answers)
            angularFrontend(absolutePath, destPath, answers)
            })
        }

        //CREATE BACKEND REACT AND VUE
        if (answers.name !== '' && answers['frontend'] === chalk.hex('#A7C7E7')('react') && answers['backend'] === 'yes') {
            expressBackend(absolutePath, destPath, answers.name)
        }
        if (answers.name !== '' && answers['frontend'] === chalk.green('vue') && answers['backend'] === 'yes') {
            expressBackend(absolutePath, destPath, answers.name)
        }
    }))
}

//INIT PROJECT
app
    .action(createProject)
app.parse(process.argv);