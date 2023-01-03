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
    {
        type: "input",
        name: 'path',
        message: chalk.hex('#a08c95').bold('please enter the path to "/../node_modules" folder: ')
    },
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
                if (fs.existsSync(winPath1)) {
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
                return macPath1
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


//CREATE FUNCTION
const createProject = () => {

    inquirer.prompt(questions).then(((answers) => {

        let absolutePath = ''

            if (answers['path'] === null || answers['path'] === undefined || answers['path'] === '' ) {
                absolutePath = absPath()
            } else {
                absolutePath = `${answers.path}/${name}/`
            }

        const destPath = `${path.resolve()}/${answers.name}`


        fs.mkdirSync(destPath)
        fs.mkdirSync(destPath + "/frontend")
        fs.mkdirSync(destPath + "/frontend/src")
        fs.mkdirSync(destPath + "/frontend/public")

        //CREATE REACT FRONTEND
        if (answers.name !== '' && answers['frontend'] === chalk.hex('#A7C7E7')('react')) {

            copyAll(
                `${absolutePath}/templates/react-frontend`,
                `${destPath}/frontend`,
                ['package.json', 'index.html', 'package-lock.json', 'tsconfig.json', 'tsconfig.node.json', 'vite.config.ts'],
            ).then(r => r);
            copyAll(
                `${absolutePath}/templates/react-frontend/src`,
                `${destPath}/frontend/src`,
                ['App.scss', 'App.tsx', 'index.css', 'main.tsx', 'vite-env.d.ts'],
            ).then(r => r);

            console.log(chalk.green(`react frontend successfully!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
        }

        //CREATE VUE FRONTEND
        if (answers.name !== '' && answers['frontend'] === chalk.green('vue')) {

            fs.mkdirSync(destPath + "/frontend/src/assets")
            fs.mkdirSync(destPath + "/frontend/src/components")
            fs.mkdirSync(destPath + "/frontend/src/components/icons")
            fs.mkdirSync(destPath + "/frontend/src/router")
            fs.mkdirSync(destPath + "/frontend/src/views")

            copyAll(
                `${absolutePath}/templates/vue-frontend`,
                `${destPath}/frontend`,
                ['env.d.ts', 'index.html', 'package.json', 'package-lock.json', 'README.md', 'tsconfig.config.json', 'tsconfig.json', 'vite.config.ts'],
            ).then(r => r);
            copyAll(
                `${absolutePath}/templates/vue-frontend/src`,
                `${destPath}/frontend/src`,
                ['App.vue', 'main.ts'],
            ).then(r => r);
            copyAll(
                `${absolutePath}/templates/vue-frontend/src/assets`,
                `${destPath}/frontend/src/assets`,
                ['base.css', 'logo.svg', 'main.css'],
            ).then(r => r);
            copyAll(
                `${absolutePath}/templates/vue-frontend/src/components`,
                `${destPath}/frontend/src/components`,
                ['HelloWorld.vue', 'TheWelcome.vue', 'WelcomeItem.vue'],
            ).then(r => r);
            copyAll(
                `${absolutePath}/templates/vue-frontend/src/components/icons`,
                `${destPath}/frontend/src/components/icons`,
                ['IconCommunity.vue', 'IconDocumentation.vue', 'IconEcosystem.vue', 'IconSupport.vue', 'IconTooling.vue'],
            ).then(r => r);
            copyAll(
                `${absolutePath}/templates/vue-frontend/src/router`,
                `${destPath}/frontend/src/router`,
                ['index.ts'],
            ).then(r => r);
            copyAll(
                `${absolutePath}/templates/vue-frontend/src/views`,
                `${destPath}/frontend/src/views`,
                ['AboutView.vue', 'HomeView.vue'],
            ).then(r => r);

            console.log(chalk.green(`vue backend successfully!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
        }

        //CREATE ANGULAR FRONTEND
        if (answers.name !== '' && answers['frontend'] === chalk.hex('#ff7247')('angular')) {

            fs.mkdirSync(destPath + '/frontend/src/app')
            fs.mkdirSync(destPath + '/frontend/src/assets')

            copyAll(
                `${absolutePath}/templates/angular-frontend`,
                `${destPath}/frontend`,
                ['angular.json', 'package.json', 'package-lock.json', 'README.md', 'tsconfig.app.json', 'tsconfig.spec.json', 'tsconfig.json'],
            ).then(r => r);
            copyAll(
                `${absolutePath}/templates/angular-frontend/src`,
                `${destPath}/frontend/src`,
                ['styles.sass', 'index.html', 'favicon.ico', 'main.ts'],
            ).then(r => r);
            copyAll(
                `${absolutePath}/templates/angular-frontend/src/assets`,
                `${destPath}/frontend/src/assets`,
                ['.gitkeep'],
            ).then(r => r);
            copyAll(
                `${absolutePath}/templates/angular-frontend/src/app`,
                `${destPath}/frontend/src/app`,
                ['app.component.html', 'app.component.sass', 'app.component.ts', 'app.module.ts', 'app-routing.module.ts'],
            ).then(r => r);

            console.log(chalk.green(`angular backend successfully!
            
            cd ${answers.name}
            cd frontend
            npm install
            ng serve`))
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


app
    .action(createProject)
app.parse(process.argv);