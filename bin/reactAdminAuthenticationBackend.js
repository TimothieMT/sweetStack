import copyFiles from "./copyFiles.js";
import chalk from "chalk";

const pathArrayReactAdminTo = ['backend','backend/src', 'backend/src/data']
const pathArrayReactAdminFrom = ['templates/react_adminAuthentication_backend', 'templates/react_adminAuthentication_backend/src', 'templates/react_adminAuthentication_backend/src/data']

function reactAdminAuthenticationBackend(answers, from, to) {

    setTimeout(() => {
        copyFiles(pathArrayReactAdminFrom, pathArrayReactAdminTo, from, to)
        console.log(chalk.green(`react admin authentication backend completed!
            
            cd ${answers.name}
            cd backend
            npm install
            npm run dev`))
    }, 2000)
}

export default reactAdminAuthenticationBackend