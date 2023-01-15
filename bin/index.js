#!/usr/bin/env node

//IMPORTS
import inquirer from "inquirer";
import {Command} from "commander";
import * as path from "path";
import chalk from "chalk";
import fuzzy from "inquirer-fuzzy-path"
import createProject from "./createProject.js";

//VARIABLES
const app = new Command();
const name = 'sweetstack'
const listHooks = ['useEffect/Axios', 'useState', 'useReducer', 'useContext', 'useRef']
const questions = [
    {type: "input", name: 'name', message: chalk.hex('#a08c95').bold('project name:')},
    {
        type: "list",
        name: 'frontend',
        choices: [chalk.hex('#A7C7E7')('react'), chalk.green('vue'), chalk.hex('#ff7247')('angular')],
        message: chalk.hex('#a08c95').bold('selected frontend: ')
    },
    {
        type: "list",
        name: 'menu',
        choices: ['menu', 'menu included Zustand', 'CRUD/Lowdb and PIN authentication', 'admin authentication', 'CRUD API which adds/edits/deletes data from a database','none'],
        message: chalk.hex('#a08c95').bold('react template with:  '),
        when: function (answers) {
            return answers['frontend'] === chalk.hex('#A7C7E7')('react')
        }
    },
    {
        type: "checkbox",
        name: 'hooks',
        message: chalk.hex('#a08c95').bold('selected hooks with "space" and confirm with "enter": '),
        choices: listHooks,
        when: function (answers) {
            return answers['frontend'] === chalk.hex('#A7C7E7')('react')
        }
    },

    {type: "list", name: 'backend', choices: ['yes', 'no'], message: chalk.hex('#a08c95').bold('need a backend? ')},
    {
        type: "fuzzypath",
        name: 'path',
        itemType: 'directory',
        rootPath: process.env.HOME,
        message: chalk.hex('#a08c95').bold('please enter the path to "/../node_modules" folder: '),
        default: 'path to node_modules',
        suggestOnly: false,
        depthLimit: 1,
    }
]


inquirer.registerPrompt('fuzzypath', fuzzy)
inquirer.prompt(questions)
    .then(((answers) => {


        const absolutePath = `${answers.path}/${name}`
        const destPath = `${path.resolve()}/${answers.name}`

        createProject(answers, absolutePath, destPath)

    }))


//INIT PROJECT
app.parse(process.argv)

export default app