import copyFiles from "./copyFiles.js";
import reactHooks from "./reactHooks.js";
import chalk from "chalk";


const pathArrayReactApiTo = ['sqliteFrontend', 'sqliteFrontend/src', 'sqliteFrontend/src/components', 'sqliteFrontend/src/pages', 'sqliteFrontend/public', 'sqliteFrontend/cli', "sqliteFrontend/dev", "sqliteFrontend/dev"
    , 'sqliteBackend', 'sqliteBackend/src', 'sqliteBackend/src/data']
const pathArrayReactApiFrom = ['templates/sqlite_crud_frontend','templates/sqlite_crud_frontend/dev', 'templates/sqlite_crud_frontend/src', 'templates/sqlite_crud_frontend/src/components', 'templates/sqlite_crud_frontend/public', 'templates/sqlite_crud_frontend/cli'
    , 'templates/sqlite_crud_backend', 'templates/sqlite_crud_backend/src', 'templates/sqlite_crud_backend/src/data']


function reactApiDatabase(answers, from, to) {
    console.log(`
    create files...`)


    setTimeout(() => {
        copyFiles(pathArrayReactApiFrom, pathArrayReactApiTo, from, to)
        reactHooks(answers, from, to + '/sqlite_crud_frontend/src/App.tsx')
        console.log(chalk.green(`    react CRUD sqlite is completed!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
    }, 2000)
}

export default reactApiDatabase