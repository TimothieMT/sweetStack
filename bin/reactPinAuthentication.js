import copyFiles from "./copyFiles.js";
import reactHooks from "./reactHooks.js";
import chalk from "chalk";


const pathArrayReactPinTo = ['reactPinAuthentication', 'reactPinAuthentication/frontend', 'reactPinAuthentication/frontend/src', 'reactPinAuthentication/frontend/src/assets',
    'reactPinAuthentication/frontend/src/components', 'reactPinAuthentication/frontend/src/styles', 'reactPinAuthentication/frontend/src/pages', 'reactPinAuthentication/frontend/public', 'reactPinAuthentication/frontend/cli',
    'reactPinAuthentication/backend', 'reactPinAuthentication/backend/src', 'reactPinAuthentication/backend/src/data']
const pathArrayReactPinFrom = ['templates/react_CRUD:Lowdb_pinAuthentication','templates/react_CRUD:Lowdb_pinAuthentication/frontend/dev', 'templates/react_CRUD:Lowdb_pinAuthentication/frontend/src', 'templates/react_CRUD:Lowdb_pinAuthentication/frontend/src/assets', 'templates/react_CRUD:Lowdb_pinAuthentication/frontend/public', 'templates/react_CRUD:Lowdb_pinAuthentication/frontend/cli'
, 'templates/react_CRUD:Lowdb_pinAuthentication/backend', 'templates/react_CRUD:Lowdb_pinAuthentication/backend/src', 'templates/react_CRUD:Lowdb_pinAuthentication/backend/src/data']


function reactPinAuthentication(answers, from, to) {

    console.log(`
    create files...`)


    setTimeout(() => {
        copyFiles(pathArrayReactPinFrom, pathArrayReactPinTo, from, to)
        reactHooks(answers, from, to + '/frontend/src/App.tsx')
        console.log(chalk.green(`    react CRUD pin authentication with lowdb completed!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
    }, 2000)

}

export default reactPinAuthentication