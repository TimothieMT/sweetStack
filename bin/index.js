#!/usr/bin/env node

import inquirer from "inquirer";
import {Command, Option} from "commander";
import fs from 'fs';

const app = new Command();
const name = "cli"
const questions = [{type: "input", name: 'name', message: 'project name:'}, {
    type: "list",
    name: 'frontend',
    choices: ['react', 'vue', 'angular'],
    message: 'selected frontend:'
}, {type: "list", name: 'backend', choices: ['yes', 'no'], message: 'need a backend ?'}]


const filename = () => {
    inquirer.prompt(questions).then(((answers) => {
        if (answers.name !== ' ' && answers['frontend'] === 'react' && answers['backend'] === 'no') {


            const path = './' + answers.name
            const reactTemplate = './templates/react-frontend'



                fs.mkdir(path, (err) => {
                    if (err) {
                        console.log("error occurred in creating new directory", err);
                        return;
                    }

                    fs.copyFileSync(reactTemplate, path, function (err) {
                        if (err) {
                            console.log('An error occurred while copying the folder.')
                            return console.error(err)
                        }
                        console.log('Copy completed!')
                    });

                    console.log("New directory created successfully" + fs.readFileSync(reactTemplate));
                })
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
// program.command('create')
//     .description('create new project')
//     .argument('<project_name>', 'project name')
// .action((project_name) => {
//     const path = './' + project_name
//     fs.mkdir(path, (err) => {
//         if (err) {
//             console.log("error occurred in creating new directory", err);
//             return;
//         }
//         console.log("New directory created successfully");
//     })
// })
//
// program.command('react')
//     .description('react frontend')
//     .argument('-r, --react', 'react')
//     .action((react) => {
//         console.log(react)
//     })
//
// program.command('vue')
//     .description('vue frontend')
//     .argument('-v, --vue', 'vue')
//     .action((vue) => {
//         console.log(vue)
//     })
//
// program
//     .name('angular')
//     .command('angular')
//     .description('angular frontend')
//     .argument('-a, --angular', 'angular')
//     .action((angular) => {
//         console.log(angular)
//     })
// program.command('backend')
//     .description('backend')
//     .argument('-b, --backend', 'backend')
//     .action((backend) => {
//         console.log('backend')
//     })

// .option('-b, --backend', 'backend')
// .argument('react , vue, angular','frontend')
// .argument('-r, --react', 'react frontend')
// .action((react) => {
//     console.log('react')
// })

// .argument('-v, --vue', 'react frontend')
// .action((vue) => {
//     console.log('vue')
// })

// const options = program.opts()



