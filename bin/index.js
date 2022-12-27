#!/usr/bin/env node

import inquirer from "inquirer";
import {Command} from "commander";
import fs from 'fs';
import {join} from 'path'
import {copyFile} from 'fs/promises'
import * as path from "path";
import {fileURLToPath} from 'url';

const app = new Command();
const name = "sweetstack";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questions = [{type: "input", name: 'name', message: 'project name:'}, {
    type: "list",
    name: 'frontend',
    choices: ['react', 'vue', 'angular'],
    message: 'selected frontend:'
}, {type: "list", name: 'backend', choices: ['yes', 'no'], message: 'need a backend ?'}]


async function copyAFile(from, to) {
    try {
        await copyFile(from, to);
        console.log(`Copied ${from} to ${to}`);
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

    //CREATE REACT FRONTEND AND BACKEND
    inquirer.prompt(questions).then(((answers) => {

        const srcFile = `${process.cwd()}/${answers.name}`;

        if (answers.name !== '' && answers['frontend'] === 'react') {

            fs.mkdir(srcFile, (err) => {
                if (err) {
                    console.log("error occurred in creating new directory", err);
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

                console.log("New directory created successfully");

                if (answers['backend'] === 'yes') {
                    fs.mkdirSync(srcFile + "/backend")
                    fs.mkdirSync(srcFile + "/backend/dist")
                    fs.mkdirSync(srcFile + "/backend/src")
                    // fs.mkdirSync(srcFile + "/backend/dist/")

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
                }
            });
        } else {
            console.log(answers)
        }
    }))

}

app
    .name(name)
    .description('create' + name)
    .version('1.0.0')
    .action(createProject)


app.parse(process.argv);