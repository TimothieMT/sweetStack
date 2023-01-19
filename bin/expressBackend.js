import chalk from "chalk";
import copyFiles from "./copyFiles.js";

const pathArrayExpressBackendTo = ['backend','backend/dist', 'backend/src']
const pathArrayExpressBackendFrom = ['templates/express-backend', 'templates/express-backend/dist', 'templates/express-backend/src']

function expressBackend(answers, from, to) {

    console.log(`create files...`)

    setTimeout(() => {
        copyFiles(pathArrayExpressBackendFrom, pathArrayExpressBackendTo, from, to)
        console.log(chalk.green(`express backend completed!
            
            cd ${answers.name}
            cd backend
            npm install
            npm run dev`))
    }, 2500)

}

export default expressBackend;