import copyFiles from "./copyFiles.js";
import chalk from "chalk";


function reactPinAuthenticationBackend(answers, from, to) {

    const pathArrayReactPinTo = [`${answers.name}-backend`, 'backend', 'backend/src', 'backend/src/data']
    const pathArrayReactPinFrom = ['templates/react_CRUDLowdb_pinAuthentication_backend', 'templates/react_CRUDLowdb_pinAuthentication_backend/src', 'templates/react_CRUDLowdb_pinAuthentication_backend/src/data']


    setTimeout(() => {
        copyFiles(pathArrayReactPinFrom, pathArrayReactPinTo, from, to)
        console.log(chalk.green(`react CRUD pin authentication with lowdb backend completed!
            
            cd ${answers.name}
            cd ${answers.name}-backend
            npm install
            npm run dev`))
    }, 2000)

}

export default reactPinAuthenticationBackend