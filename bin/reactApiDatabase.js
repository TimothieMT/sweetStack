import copyFiles from "./copyFiles.js";
import chalk from "chalk";


const pathArrayReactApiTo = ['SqliteCRUD','frontend/src', 'frontend/src/components', 'frontend/src/pages', 'frontend/public', 'frontend/cli', "frontend/dev", "frontend/dev"
    , 'backend', 'backend/src', 'backend/src/data']
const pathArrayReactApiFrom = ['templates/react_sqlite_CRUD', 'templates/react_sqlite_CRUD/frontend/dev', 'templates/react_sqlite_CRUD/frontend/src', 'templates/react_sqlite_CRUD/frontend/src/pages', 'templates/react_sqlite_CRUD/frontend/src/components', 'templates/react_sqlite_CRUD/frontend/public', 'templates/react_sqlite_CRUD/frontend/cli'
    , 'templates/react_sqlite_CRUD/backend/src', 'templates/react_sqlite_CRUD/backend/src/data']


function reactApiDatabase(answers, from, to) {
    console.log(`create files...`)

    setTimeout(() => {
        copyFiles(pathArrayReactApiFrom, pathArrayReactApiTo, from, to)
        console.log(chalk.green(`react CRUD sqlite is completed!
            
            cd ${answers.name}
            cd sqliteCRUD
            cd frontend
            npm install
            npm run dev
            cd backend
            npm install
            npm run dev`))
    }, 2000)
}

export default reactApiDatabase