import copyFiles from "./copyFiles.js";
import reactHooks from "./reactHooks.js";
import chalk from "chalk";


const pathArrayReactApiTo = ['sqliteFrontend', 'sqliteFrontend/src', 'sqliteFrontend/src/components', 'sqliteFrontend/src/pages', 'sqliteFrontend/public', 'sqliteFrontend/cli', "sqliteFrontend/dev", "sqliteFrontend/dev"
    , 'sqliteBackend', 'sqliteBackend/src', 'sqliteBackend/src/data']
const pathArrayReactApiFrom = ['templates/react_sqlite_CRUD', 'templates/react_sqlite_CRUD/sqlite_crud_frontend/dev', 'templates/react_sqlite_CRUD/sqlite_crud_frontend/src', 'templates/react_sqlite_CRUD/sqlite_crud_frontend/src/pages', 'templates/react_sqlite_CRUD/sqlite_crud_frontend/src/components', 'templates/react_sqlite_CRUD/sqlite_crud_frontend/public', 'templates/react_sqlite_CRUD/sqlite_crud_frontend/cli'
    , 'templates/react_sqlite_CRUD/sqlite_crud_backend/src', 'templates/react_sqlite_CRUD/sqlite_crud_backend/src/data']


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