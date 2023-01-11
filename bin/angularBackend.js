import fs from "fs";
import chalk from "chalk";
import copyAll from "./copyFunction.js";


function angularBackend(from, to, answers) {
    //CREATE ANGULAR BACKEND

    fs.mkdirSync(to)
    fs.mkdirSync(to + "/backend")
    fs.mkdirSync(to + "/backend/public")
    fs.mkdirSync(to + "/backend/src")
    fs.mkdirSync(to + '/backend/src/app')
    fs.mkdirSync(to + '/backend/src/assets')

    copyAll(
        `${from}/templates/angular-frontend`,
        `${to}/backend`,
        ['angular.json', 'package.json', 'package-lock.json', 'README.md', 'tsconfig.app.json', 'tsconfig.spec.json', 'tsconfig.json'],
    ).then(r => r);
    copyAll(
        `${from}/templates/angular-frontend/src`,
        `${to}/backend/src`,
        ['styles.sass', 'index.html', 'favicon.ico', 'main.ts'],
    ).then(r => r);
    copyAll(
        `${from}/templates/angular-frontend/src/assets`,
        `${to}/backend/src/assets`,
        ['.gitkeep'],
    ).then(r => r);
    copyAll(
        `${from}/templates/backend-components`,
        `${to}/backend/src/app`,
        ['app.component.html', 'app.component.sass', 'app.component.backend.ts', 'app.module.backend.ts', 'app-routing.module.ts'],
    ).then(r => r);

    console.log(chalk.green(`angular backend successfully!
            
            cd ${answers.name}
            cd backend
            npm install
            ng serve`))
}

export default angularBackend;