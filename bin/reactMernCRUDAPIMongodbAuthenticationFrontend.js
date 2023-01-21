import copyFiles from "./copyFiles.js";
import chalk from "chalk";

const pathArrayMernTo = ['frontend','frontend/src', 'frontend/public', 'frontend/dev', 'frontend/cli', 'frontend/src/pages']
const pathArrayMernFrom = ['templates/react_mern_crud_mongodb_frontend', 'templates/react_mern_crud_mongodb_frontend/src', 'templates/react_mern_crud_mongodb_frontend/public','templates/react_mern_crud_mongodb_frontend/dev', 'templates/react_mern_crud_mongodb_frontend/cli', 'templates/react_mern_crud_mongodb_frontend/src/pages']

function reactMernCRUDAPIMongodbAuthenticationFrontend(answers, from, to) {

    setTimeout(() => {
        copyFiles(pathArrayMernFrom, pathArrayMernTo, from, to)
        console.log(chalk.green(`react MERN CRUD API MongoDB authentication frontend completed!
            
            cd ${answers.name}
            cd backend
            npm install
            npm run dev`))
    }, 2000)
}

export default reactMernCRUDAPIMongodbAuthenticationFrontend