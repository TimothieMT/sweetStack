import copyFiles from "./copyFiles.js";
import reactHooks from "./reactHooks.js";
import chalk from "chalk";


const pathArrayReactApiTo = ['sqliteCRUDDatabase', 'sqliteCRUDDatabase/src', 'sqliteCRUDDatabase/src/components', 'sqliteCRUDDatabase/src/pages', 'sqliteCRUDDatabase/public', 'sqliteCRUDDatabase/cli', "sqliteCRUDDatabase/dev", "sqliteCRUDDatabase/dev"
    , 'sqliteBackend', 'sqliteBackend/src', 'sqliteBackend/src/data']
const pathArrayReactApiFrom = ['templates/react_sqlite_CRUD', 'templates/react_sqlite_CRUD/frontend/dev', 'templates/react_sqlite_CRUD/frontend/src', 'templates/react_sqlite_CRUD/frontend/src/pages', 'templates/react_sqlite_CRUD/frontend/src/components', 'templates/react_sqlite_CRUD/frontend/public', 'templates/react_sqlite_CRUD/frontend/cli'
    , 'templates/react_sqlite_CRUD/backend/src', 'templates/react_sqlite_CRUD/backend/src/data']


function reactApiDatabase(answers, from, to) {
    console.log(`
    create files...`)


    setTimeout(() => {
        copyFiles(pathArrayReactApiFrom, pathArrayReactApiTo, from, to)
        reactHooks(answers, from, to + '/frontend/src/App.tsx')
        console.log(chalk.green(`    react CRUD sqlite is completed!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
    }, 2000)
}

export default reactApiDatabase