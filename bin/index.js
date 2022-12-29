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
const name = "sweetstack";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questions = [
    {type: "input", name: 'name', message: chalk.hex('#a08c95').bold('project name:')},
    {
        type: "list",
        name: 'frontend',
        choices: [chalk.hex('#A7C7E7')('react'), chalk.green('vue'), chalk.hex('#ff7247')('angular')],
        message: chalk.hex('#a08c95').bold('selected frontend: ')
    },
    {type: "list", name: 'backend', choices: ['yes', 'no'], message: chalk.hex('#a08c95').bold('need a backend? ')}]


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

const createProject = () => {


    inquirer.prompt(questions).then(((answers) => {

        const srcFile = `${process.cwd()}/${answers.name}`;

        fs.mkdirSync(srcFile)
        fs.mkdirSync(srcFile + "/frontend")
        fs.mkdirSync(srcFile + "/frontend/src")
        fs.mkdirSync(srcFile + "/frontend/public")

        //CREATE REACT FRONTEND
        if (answers.name !== '' && answers['frontend'] === chalk.hex('#A7C7E7')('react')) {


            copyAll(
                `${path.join(__dirname, "../")}/templates/react-frontend`,
                `${srcFile}/frontend`,
                ['package.json', '.gitignore', 'index.html', 'package-lock.json', 'tsconfig.json', 'tsconfig.node.json', 'vite.config.ts'],
            ).then(r => r);
            copyAll(
                `${path.join(__dirname, "../")}/templates/react-frontend/src`,
                `${srcFile}/frontend/src`,
                ['App.scss', 'App.tsx', 'index.css', 'main.tsx', 'vite-env.d.ts'],
            ).then(r => r);

            console.log(chalk.green('react frontend successfully!'))
        }

        //CREATE VUE FRONTEND
        if (answers.name !== '' && answers['frontend'] === chalk.green('vue')) {

            fs.mkdirSync(srcFile + "/frontend/src/assets")
            fs.mkdirSync(srcFile + "/frontend/src/components")
            fs.mkdirSync(srcFile + "/frontend/src/components/icons")
            fs.mkdirSync(srcFile + "/frontend/src/router")
            fs.mkdirSync(srcFile + "/frontend/src/views")

            copyAll(
                `${path.join(__dirname, "../")}/templates/vue-frontend`,
                `${srcFile}/frontend`,
                ['env.d.ts','index.html','package.json', 'package-lock.json','README.md','tsconfig.config.json','tsconfig.json','vite.config.ts'],
            ).then(r => r);
            copyAll(
                `${path.join(__dirname, "../")}/templates/vue-frontend/src`,
                `${srcFile}/frontend/src`,
                ['App.vue','main.ts'],
            ).then(r => r);
            copyAll(
                `${path.join(__dirname, "../")}/templates/vue-frontend/src/assets`,
                `${srcFile}/frontend/src/assets`,
                ['base.css','logo.svg','main.css'],
            ).then(r => r);
            copyAll(
                `${path.join(__dirname, "../")}/templates/vue-frontend/src/components`,
                `${srcFile}/frontend/src/components`,
                ['HelloWorld.vue', 'TheWelcome.vue','WelcomeItem.vue'],
            ).then(r => r);
            copyAll(
                `${path.join(__dirname, "../")}/templates/vue-frontend/src/components/icons`,
                `${srcFile}/frontend/src/components/icons`,
                ['IconCommunity.vue','IconDocumentation.vue','IconEcosystem.vue','IconSupport.vue','IconTooling.vue'],
            ).then(r => r);
            copyAll(
                `${path.join(__dirname, "../")}/templates/vue-frontend/src/router`,
                `${srcFile}/frontend/src/router`,
                ['index.ts'],
            ).then(r => r);
            copyAll(
                `${path.join(__dirname, "../")}/templates/vue-frontend/src/views`,
                `${srcFile}/frontend/src/views`,
                ['AboutView.vue', 'HomeView.vue'],
            ).then(r => r);


            console.log(chalk.green('vue frontend successfully!'))
        }

        //CREATE REACT BACKEND
        if (answers.name !== '' && answers['frontend'] === chalk.hex('#A7C7E7')('react') && answers['backend'] === 'yes') {

            fs.mkdirSync(srcFile + "/backend")
            fs.mkdirSync(srcFile + "/backend/dist")
            fs.mkdirSync(srcFile + "/backend/src")

            copyAll(
                `${path.join(__dirname, "../")}/templates/react-backend`,
                `${srcFile}/backend`,
                ["nodemon.json", "package.json", "package-lock.json", "tsconfig.json"],
            ).then(r => r);
            copyAll(
                `${path.join(__dirname, "../")}/templates/react-backend/dist`,
                `${srcFile}/backend/dist`,
                ["server.js", "server.js.map"],
            ).then(r => r);
            copyAll(
                `${path.join(__dirname, "../")}/templates/react-backend/src`,
                `${srcFile}/backend/src`,
                ["server.ts"],
            ).then(r => r);
            console.log(chalk.green('react backend successfully!'))
        }
    }))
}
app

    .name(name)
    .description('create' + name)
    .version('1.0.0')
    .action(createProject)
app.parse(process.argv);