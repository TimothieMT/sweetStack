import copyFiles from "./copyFiles.js";
import chalk from "chalk";


const pathArrayReactPinTo = ['backend','backend/src', 'backend/src/data']
const pathArrayReactPinFrom = ['templates/react_CRUDLowdb_pinAuthentication_backend', 'templates/react_CRUDLowdb_pinAuthentication_backend/src', 'templates/react_CRUDLowdb_pinAuthentication_backend/src/data']


function reactPinAuthenticationBackend(answers, from, to) {


    setTimeout(() => {
        copyFiles(pathArrayReactPinFrom, pathArrayReactPinTo, from, to)
        console.log(chalk.green(`react CRUD pin authentication with lowdb backend completed!
            
            cd ${answers.name}
            cd backend
            npm install
            npm run dev`))
    }, 2000)

}

export default reactPinAuthenticationBackend