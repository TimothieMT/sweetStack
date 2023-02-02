#!/usr/bin/env node

//IMPORTS
import inquirer from "inquirer";
import {Command} from "commander";
import * as path from "path";
import chalk from "chalk";
import createProject from "./createProject.js";
import * as sweet from './sweet.js';

//VARIABLES


const app = new Command();
const name = 'sweetstack'
const npmRoot = await sweet.getNpmRoot();
const listHooks = ['useEffect/Axios', 'useState', 'useReducer', 'useContext', 'useRef', 'noHook']
const listMenu = ['menu', 'menu included Zustand', 'CRUD/Lowdb and PIN authentication', 'admin authentication', 'CRUD API which adds/edits/deletes data from a database', 'CRUD API mongodb and authentication', 'CRUD member authentication', 'simple page']
const questions = [
    {type: "input", name: 'name', message: chalk.hex('#a08c95').bold('project name:')},
    {
        type: "list",
        name: 'framework',
        choices: [chalk.hex('#A7C7E7')('react'), chalk.green('vue'), chalk.hex('#ff7247')('angular')],
        message: chalk.hex('#a08c95').bold('selected framework: ')
    },
    {
        type: "list",
        name: 'menu',
        choices: listMenu,
        message: chalk.hex('#a08c95').bold('react template with:  '),
        when: function (answers) {
            return answers['framework'] === chalk.hex('#A7C7E7')('react')
        }
    },
    {
        type: "list",
        name: 'hooks',
        message: chalk.hex('#a08c95').bold('selected hook: '),
        choices: listHooks,
        when: function (answers) {
            return answers['framework'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'simple page'
        }
    },

    {
        type: "list",
        name: 'backend',
        choices: ['yes', 'no'],
        message: chalk.hex('#a08c95').bold('need a backend? '),
        when: function (answers) {
            return answers['framework'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'simple page' || answers['menu'] === 'menu included Zustand' || answers['menu'] === 'menu' || answers['framework'] === chalk.green('vue') || answers['framework'] === chalk.hex('#ff7247')('angular')
        }
    },
    {
        type: "input",
        name: 'connectionString',
        message: chalk.hex('#a08c95').bold('MongoDB connection string: '),
        when: function (answers) {
            return answers['menu'] === 'CRUD member authentication'
        }
    }
]


inquirer.prompt(questions)
    .then(((answers) => {

        const absolutePath = npmRoot + '/' + name;
        const destPath = `${path.resolve()}/${answers.name}`





        createProject(answers, absolutePath, destPath)

    }), (err) => {
        console.log(err)
    })


//INIT PROJECT
app.parse(process.argv)

export default app