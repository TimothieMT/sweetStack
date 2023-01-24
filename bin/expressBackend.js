import chalk from "chalk";
import copyFiles from "./copyFiles.js";

function expressBackend(answers, from, to) {

    const pathArrayExpressBackendTo = [`${answers.name}-backend`, 'backend', 'backend/dist', 'backend/src']
    const pathArrayExpressBackendFrom = ['templates/express_backend', 'templates/express_backend/dist', 'templates/express_backend/src']

    setTimeout(() => {
        copyFiles(pathArrayExpressBackendFrom, pathArrayExpressBackendTo, from, to)
        console.log(chalk.green(`express backend completed!
            
            cd ${answers.name}
            cd ${answers.name}backend
            npm install
            npm run dev`))
    }, 2500)

}

export default expressBackend;