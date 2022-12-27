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

const questions = [{type: "input", name: 'name', message: chalk.hex('#a08c95').bold('project name:')}, {
    type: "list",
    name: 'frontend',
    choices: [chalk.blue('react'), chalk.green('vue'), chalk.hex('#ff7247')('angular')],
    message: chalk.hex('#a08c95').bold('selected frontend: ')
}, {type: "list", name: 'backend', choices: ['yes', 'no'], message: chalk.hex('#a08c95').bold('need a backend? ')}]


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

    //CREATE REACT FRONTEND
    inquirer.prompt(questions).then(((answers) => {

        const srcFile = `${process.cwd()}/${answers.name}`;

        if (answers.name !== '' && answers['frontend'] === chalk.blue('react')) {

            fs.mkdir(srcFile, (err) => {
                if (err) {
                    console.log("error occurred in creating new directory", chalk.red(err));
                }
                fs.mkdirSync(srcFile + "/frontend")
                fs.mkdirSync(srcFile + "/frontend/src")

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
            });

            console.log(chalk.green('react frontend successfully!'))

        }

        //CREATE REACT BACKEND
        if (answers.name !== '' && answers['frontend'] === chalk.blue('react') && answers['backend'] === 'yes') {
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

        console.log(chalk.red("ERROR"))

    }))
}
app

    .name(name)
    .description('create' + name)
    .version('1.0.0')
    .action(createProject)
app.parse(process.argv);cd