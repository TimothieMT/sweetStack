import copyFiles from "./copyFiles.js";
import chalk from "chalk";


const pathArrayReactApiTo = ['backend','backend/src', 'backend/src/data']
const pathArrayReactApiFrom = ['templates/react_sqlite_CRUD_backend/src', 'templates/react_sqlite_CRUD_backend/src/data']


function react_sqlite_CRUDBackend(answers, from, to) {

    setTimeout(() => {
        copyFiles(pathArrayReactApiFrom, pathArrayReactApiTo, from, to)
        console.log(chalk.green(`react CRUD sqlite backend is completed!
            
            cd ${answers.name}
            cd backend
            npm install
            npm run dev`))
    }, 2000)
}

export default react_sqlite_CRUDBackend