import copyFiles from "./copyFiles.js";
import chalk from "chalk";

const pathArrayReactAdminTo = ['backend', 'backend/src', 'backend/src/data']
const pathArrayReactAdminFrom = ['templates/react_adminAuthentication_backend', 'templates/react_adminAuthentication_backend/dev', 'templates/react_adminAuthentication_backend/src', 'templates/react_adminAuthentication_backend/src/models']

function reactMernCRUDAPIMongodbAuthenticationBackend(answers, from, to) {

    setTimeout(() => {
        copyFiles(pathArrayReactAdminFrom, pathArrayReactAdminTo, from, to)
        console.log(chalk.green(`react MERN CRUD API MongoDB authentication backend completed!
            
            cd ${answers.name}
            cd backend
            npm install
            npm run dev`))
    }, 2000)
}

export default reactMernCRUDAPIMongodbAuthenticationBackend