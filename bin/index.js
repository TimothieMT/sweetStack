#!/usr/bin/env node

import inquirer from "inquirer";
import {Command} from "commander";
import fs from 'fs';
import {join} from 'path'
import {copyFile} from 'fs/promises'

const app = new Command();
const name = "sweetstack";

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
        const destFile = process.cwd();

        console.log(`dest: ${destFile} /src: ${srcFile}`);


        if (answers.name !== '' && answers['frontend'] === 'react') {

            fs.mkdir(srcFile, (err) => {
                if (err) {
                    console.log("error occurred in creating new directory", err);
                }
                fs.mkdirSync(srcFile + "/frontend")
                fs.mkdirSync(srcFile + "/frontend/src")

                copyAll(
                    `${process.cwd()}/${name}/templates/react-frontend`,
                    `${process.cwd()}/${answers.name}/frontend`,
                    ['package.json', '.gitignore', 'index.html', 'package-lock.json', 'tsconfig.json', 'tsconfig.node.json', 'vite.config.ts'],
                ).then(r => r);
                copyAll(
                    `${process.cwd()}/${name}/templates/react-frontend/src`,
                    `${process.cwd()}/${answers.name}/frontend/src`,
                    ['App.scss', 'App.tsx', 'index.css', 'main.tsx', 'vite-env.d.ts'],
                ).then(r => r);

                console.log("New directory created successfully");

                if (answers['backend'] === 'yes') {
                    fs.mkdirSync(srcFile + "/backend")
                    fs.mkdirSync(srcFile + "/backend/dist")
                    fs.mkdirSync(srcFile + "/backend/src")
                    // fs.mkdirSync(srcFile + "/backend/dist/")
                    copyAll(process.cwd() + "/" + name + "/templates/react-backend", process.cwd() + "/" + answers.name + "/backend", ["nodemon.json", "package.json", "package-lock.json", "tsconfig.json"]).then(r => r)
                    copyAll(process.cwd() + "/" + name + "/templates/react-backend/dist", process.cwd() + "/" + answers.name + "/backend/dist", ["server.js", "server.js.map"]).then(r => r)
                    copyAll(process.cwd() + "/" + name + "/templates/react-backend/src", process.cwd() + "/" + answers.name + "/backend/src", ["server.ts"]).then(r => r)
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

// import fs from 'fs';
// import { join } from 'path';
// import inquirer from 'inquirer';
// import { copyFile } from 'fs/promises';
//
// const name = 'sweetstack';
//
// const questions = [
//     { type: 'input', name: 'name', message: 'project name:' },
//     {
//         type: 'list',
//         name: 'frontend',
//         choices: ['react', 'vue', 'angular'],
//         message: 'selected frontend:',
//     },
//     { type: 'list', name: 'backend', choices: ['yes', 'no'], message: 'need a backend ?' },
// ];
//
// async function copyAFile(from, to) {
//     try {
//         await copyFile(from, to);
//         console.log(`Copied ${from} to ${to}`);
//     } catch (err) {
//         console.error(`Got an error trying to copy the file: ${err.message}`);
//     }
// }
//
// async function copyAll(fromDir, toDir, filePaths) {
//     return Promise.all(
//         filePaths.map(filePath => {
//             return copyAFile(join(fromDir, filePath), join(toDir, filePath));
//         }),
//     );
// }
//
// const createProject = async () => {
//     const answers = await inquirer.prompt(questions);
//
//     if (answers.name !== '' && answers.frontend === 'react') {
//         const srcFile = `${process.cwd()}/${answers.name}`;
//         const destFile = process.cwd();
//
//         console.log(`dest: ${destFile} /src: ${srcFile}`);
//
//         try {
//             fs.mkdirSync(srcFile);
//             fs.mkdirSync(`${srcFile}/frontend`);
//             fs.mkdirSync(`${srcFile}/frontend/src`);
//
//             await copyAll(
//                 `${process.cwd()}/${name}/templates/react-frontend`,
//                 `${process.cwd()}/${answers.name}/frontend`,
//                 ['package.json', '.gitignore', 'index.html', 'package-lock.json', 'tsconfig.json', 'tsconfig.node.json', 'vite.config.ts'],
//             );
//             await copyAll(
//                 `${process.cwd()}/${name}/templates/react-frontend/src`,
//                 `${process.cwd()}/${answers.name}/frontend/src`,
//                 ['App.scss', 'App.tsx', 'index.css', 'main.tsx', 'vite-env.d.ts'],
//             );
//
//             console.log('New directory created successfully');
//
//             if (answers.backend === 'yes') {
//                 fs.mkdirSync(`${srcFile}/backend`);
//                 fs.mkdirSync(`${srcFile}/backend/dist`);
//                 fs.mkdirSync(`${srcFile}/backend/src`);


