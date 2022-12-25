#!/usr/bin/env node

import inquirer from "inquirer";
import {Command, Option} from "commander";
import fs from 'fs';
import {join} from 'path'
import {copyFile} from 'fs/promises'

const {COPYFILE_EXCL} = fs.constants;

const app = new Command();
const name = "sweetstack";

const questions = [
    {type: "input", name: 'name', message: 'project name:'},
    {type: "list", name: 'frontend', choices: ['react', 'vue', 'angular'], message: 'selected frontend:'},
    {type: "list", name: 'backend', choices: ['yes', 'no'], message: 'need a backend ?'}
]


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

const filename = () => {
    inquirer.prompt(questions).then(((answers) => {

        const destFile = "./templates/react-frontend"
        const srcFile = "./" + answers.name

        if (answers.name !== '' && answers['frontend'] === 'react' && answers['backend'] === 'no') {

            fs.mkdir(srcFile, (err) => {
                if (err) {
                    console.log("error occurred in creating new directory", err);
                }
                fs.mkdirSync("./" + answers.name + "/frontend")
                fs.mkdirSync("./" + answers.name + "/src")

                copyAll(destFile, "./" + answers.name + "/", ["package.json", ".gitignore", "index.html", "package-lock.json", "tsconfig.json", "tsconfig.node.json", "vite.config.ts"]).then(r => r)
                copyAll("./templates/react-frontend/src", "./" + answers.name + "/src", ["App.scss", "App.tsx","index.css","main.tsx","vite-env.d.ts"]).then(r => r)

                console.log("New directory created successfully");
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
    .action(filename)


app.parse(process.argv);



