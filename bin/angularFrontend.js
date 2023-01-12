import chalk from "chalk";
import copyFiles from "./copyFiles.js";

export const pathArrayAngularFrontendTo = ['frontend','frontend/src','frontend/public','frontend/src/app', 'frontend/src/assets']
export const pathArrayAngularFrontendFrom = ['templates/angular-frontend', 'templates/angular-frontend/public', 'templates/angular-frontend/src', 'templates/angular-frontend/src/assets', 'templates/backend-components']

function angularFrontend(from, to, answers) {
    //CREATE ANGULAR FRONTEND

    console.log(`
    create project...`)

    setTimeout(() => {
        copyFiles(pathArrayAngularFrontendFrom, pathArrayAngularFrontendTo, from, to)
        console.log(chalk.green(`    angular frontend completed!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
    }, 2000)
}

export default angularFrontend;