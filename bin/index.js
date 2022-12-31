#!/usr/bin/env node

import inquirer from "inquirer";
import {Command} from "commander";
import fs from 'fs';
import {join} from 'path'
import {copyFile} from 'fs/promises'
import * as path from "path";
import {fileURLToPath} from 'url';
import chalk from "chalk";


const app = new Command();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const name = 'sweetstack'

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


async function copyAFile(from, to) {
    try {
        await copyFile(from, to);
    } catch (err) {
        console.error(`Got an error trying to copy the file: ${err.message}`);
    }
}

async function copyAll(fromDir, toDir, filePaths) {
    return Promise.all(filePaths.map(filePath => {
        return copyAFile(join(fromDir, filePath), join(toDir, filePath));
    }));
}

function absPath() {

    let result = ''

    if (process.platform === 'linux') {
        result = `${path.parse(process.cwd()).root}/lib/node_modules/${name}/`
    }
    if (process.platform === 'darwin') {
        result = `${path.parse(process.cwd()).root}/usr/local/lib/node_modules/${name}/`
    }
    if (process.platform === 'win32'){
        result = `${path.parse(process.cwd()).root}/Users/${process.env.USERNAME}/AppData/Roaming/npm/node_modules/${name}/`
    }

    return result
}


const createProject = () => {

    inquirer.prompt(questions).then(((answers) => {

        const absolutePath = absPath()

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

        //CREATE REACT BACKEND
        if (answers.name !== '' && answers['frontend'] === chalk.hex('#A7C7E7')('react') && answers['backend'] === 'yes') {

            fs.mkdirSync(destPath + "/backend")
            fs.mkdirSync(destPath + "/backend/dist")
            fs.mkdirSync(destPath + "/backend/src")

            copyAll(
                `${absolutePath}/templates/react-backend`,
                `${destPath}/backend`,
                ["nodemon.json", "package.json", "package-lock.json", "tsconfig.json"],
            ).then(r => r);
            copyAll(
                `${absolutePath}/templates/react-backend/dist`,
                `${destPath}/backend/dist`,
                ["server.js", "server.js.map"],
            ).then(r => r);
            copyAll(
                `${absolutePath}/templates/react-backend/src`,
                `${destPath}/backend/src`,
                ["server.ts"],
            ).then(r => r);
            console.log(chalk.green(`react backend successfully!
            
            cd ${answers.name}
            cd frontend
            npm install
            cd backend
            npm install
            npm run dev`))
        }
    }))

}
app
    .action(createProject)
app.parse(process.argv);