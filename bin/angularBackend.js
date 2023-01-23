import chalk from "chalk";
import copyFiles from "./copyFiles.js";

const pathArrayAngularBackendTo = ['backend', 'backend/public', 'backend/src', 'backend/src/assets', 'backend/src/app']
const pathArrayAngularBackendFrom = ['templates/angular_frontend', 'templates/angular_frontend/public', 'templates/angular_frontend/src', 'templates/angular_frontend/src/assets', 'templates/angular_backend_components']

function angularBackend(from, to, answers) {

    setTimeout(() => {
        copyFiles(pathArrayAngularBackendFrom, pathArrayAngularBackendTo, from, to)
        console.log(chalk.green(`angular backend completed!
            
            cd ${answers.name}
            cd frontend
            npm install
            ng serve`))
    }, 2000)

}

export default angularBackend;