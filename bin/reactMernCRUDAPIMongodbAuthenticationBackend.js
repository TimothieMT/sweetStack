import copyFiles from "./copyFiles.js";
import chalk from "chalk";

const pathArrayMernTo = ['backend', 'backend/src', 'backend/src/models','backend/dev']
const pathArrayMernFrom = ['templates/react_mern_crud_mongodb_backend', 'templates/react_mern_crud_mongodb_backend/dev', 'templates/react_mern_crud_mongodb_backend/src', 'templates/react_mern_crud_mongodb_backend/src/models']

function reactMernCRUDAPIMongodbAuthenticationBackend(answers, from, to) {

    setTimeout(() => {
        copyFiles(pathArrayMernFrom, pathArrayMernTo, from, to)
        console.log(chalk.green(`react MERN CRUD API MongoDB authentication backend completed!
            
            cd ${answers.name}
            cd backend
            npm install
            npm run dev`))
    }, 2000)
}

export default reactMernCRUDAPIMongodbAuthenticationBackend