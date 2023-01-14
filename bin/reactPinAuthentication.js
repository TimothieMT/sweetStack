import copyFiles from "./copyFiles.js";
import reactHooks from "./reactHooks.js";
import chalk from "chalk";


const pathArrayReactPinTo = ['reactPinAuthentication', 'reactPinAuthentication/frontend', 'reactPinAuthentication/frontend/src', 'reactPinAuthentication/frontend/src/assets',
    'reactPinAuthentication/frontend/src/components', 'reactPinAuthentication/frontend/src/styles', 'reactPinAuthentication/frontend/src/pages', 'reactPinAuthentication/frontend/public', 'reactPinAuthentication/frontend/cli',
    'reactPinAuthentication/backend', 'reactPinAuthentication/backend/src', 'reactPinAuthentication/backend/src/data']
const pathArrayReactPinFrom = ['templates/react_CRUD:Lowdb_pinAuthentication','templates/react_CRUD:Lowdb_pinAuthentication/frontend_CRUD/dev', 'templates/react_CRUD:Lowdb_pinAuthentication/frontend_CRUD/src', 'templates/react_CRUD:Lowdb_pinAuthentication/frontend_CRUD/src/assets', 'templates/react_CRUD:Lowdb_pinAuthentication/frontend_CRUD/public', 'templates/react_CRUD:Lowdb_pinAuthentication/frontend_CRUD/cli'
, 'templates/react_CRUD:Lowdb_pinAuthentication/backend_CRUD', 'templates/react_CRUD:Lowdb_pinAuthentication/backend_CRUD/src', 'templates/react_CRUD:Lowdb_pinAuthentication/backend_CRUD/src/data']


function reactPinAuthentication(answers, from, to) {

    console.log(`
    create files...`)


    setTimeout(() => {
        copyFiles(pathArrayReactPinFrom, pathArrayReactPinTo, from, to)
        reactHooks(answers, from, to + '/reactPinAuthentication/src/App.tsx')
        console.log(chalk.green(`    react CRUD pin authentication with lowdb completed!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
    }, 2000)

}

export default reactPinAuthentication