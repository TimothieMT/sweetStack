import chalk from "chalk";
import copyFiles from "./copyFiles.js";

const pathArrayAngularBackendTo = ['backend', 'backend/public', 'backend/src', 'backend/src/assets', 'backend/src/app']
const pathArrayAngularBackendFrom = ['templates/angular-frontend', 'templates/angular-frontend/public', 'templates/angular-frontend/src', 'templates/angular-frontend/src/assets', 'templates/backend-components']

function angularBackend(from, to, answers) {
    //CREATE ANGULAR BACKEND

    console.log(`
    create files...`)


    setTimeout(() => {
        copyFiles(pathArrayAngularBackendFrom, pathArrayAngularBackendTo, from, to)
        console.log(chalk.green(`    angular backend completed!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
    }, 2000)

}

export default angularBackend;