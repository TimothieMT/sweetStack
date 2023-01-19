import copyFiles from "./copyFiles.js";
import chalk from "chalk";


const pathArrayReactApiTo = ['frontend','frontend/src', 'frontend/src/components', 'frontend/src/pages', 'frontend/public', 'frontend/cli', "frontend/dev"]
const pathArrayReactApiFrom = ['templates/react_sqlite_CRUD', 'templates/react_sqlite_CRUD/dev', 'templates/react_sqlite_CRUD/src', 'templates/react_sqlite_CRUD/src/pages', 'templates/react_sqlite_CRUD/src/components', 'templates/react_sqlite_CRUD/public', 'templates/react_sqlite_CRUD/cli']


function react_sqlite_CRUD(answers, from, to) {

    setTimeout(() => {
        copyFiles(pathArrayReactApiFrom, pathArrayReactApiTo, from, to)
        console.log(chalk.green(`react CRUD sqlite frontend is completed!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
    }, 2000)
}

export default react_sqlite_CRUD