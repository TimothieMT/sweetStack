import chalk from "chalk";
import copyFiles from "./copyFiles.js";

export const pathArrayAngularFrontendTo = ['frontend', 'frontend/src', 'frontend/public', 'frontend/src/app', 'frontend/src/assets']
export const pathArrayAngularFrontendFrom = ['templates/angular_frontend', 'templates/angular_frontend/public', 'templates/angular_frontend/src', 'templates/angular_frontend/src/assets', 'templates/backend_components']

function angularFrontend(from, to, answers) {

    setTimeout(() => {
        copyFiles(pathArrayAngularFrontendFrom, pathArrayAngularFrontendTo, from, to)
        console.log(chalk.green(`angular frontend completed!
            
            cd ${answers.name}
            cd frontend
            npm install
            ng serve`))
    }, 2000)

    return true
}

export default angularFrontend;