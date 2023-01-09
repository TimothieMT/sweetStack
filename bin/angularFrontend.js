import fs from "fs";
import chalk from "chalk";
import copyAll from "./copyFunction.js";

function angularFrontend(from, to, answers) {
    //CREATE ANGULAR FRONTEND

    fs.mkdirSync(to)
    fs.mkdirSync(to + "/frontend")
    fs.mkdirSync(to + "/frontend/src")
    fs.mkdirSync(to + "/frontend/public")
    fs.mkdirSync(to + '/frontend/src/app')
    fs.mkdirSync(to + '/frontend/src/assets')

    copyAll(
        `${from}/templates/angular-frontend`,
        `${to}/frontend`,
        ['angular.json', 'package.json', 'package-lock.json', 'README.md', 'tsconfig.app.json', 'tsconfig.spec.json', 'tsconfig.json'],
    ).then(r => r);
    copyAll(
        `${from}/templates/angular-frontend/src`,
        `${to}/frontend/src`,
        ['styles.sass', 'index.html', 'favicon.ico', 'main.ts'],
    ).then(r => r);
    copyAll(
        `${from}/templates/angular-frontend/src/assets`,
        `${to}/frontend/src/assets`,
        ['.gitkeep'],
    ).then(r => r);
    copyAll(
        `${from}/templates/angular-frontend/src/app`,
        `${to}/frontend/src/app`,
        ['app.component.html', 'app.component.sass', 'app.component.ts', 'app.module.ts', 'app-routing.module.ts'],
    ).then(r => r);

    console.log(chalk.green(`angular backend successfully!
            
            cd ${answers.name}
            cd frontend
            npm install
            ng serve`))
}

export default angularFrontend;