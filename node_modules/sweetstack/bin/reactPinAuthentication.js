import copyFiles from "./copyFiles.js";
import chalk from "chalk";


const pathArrayReactPinTo = ['PinAuthentication_CRUD', 'frontend/src', 'frontend/src/assets',
    'frontend/src/components', 'frontend/src/styles', 'frontend/src/pages', 'frontend/public', 'frontend/cli',
    'backend', 'backend/src', 'backend/src/data']
const pathArrayReactPinFrom = ['templates/react_CRUD:Lowdb_pinAuthentication', 'templates/react_CRUD:Lowdb_pinAuthentication/frontend/dev', 'templates/react_CRUD:Lowdb_pinAuthentication/frontend/src', 'templates/react_CRUD:Lowdb_pinAuthentication/frontend/src/assets', 'templates/react_CRUD:Lowdb_pinAuthentication/frontend/public', 'templates/react_CRUD:Lowdb_pinAuthentication/frontend/cli'
    , 'templates/react_CRUD:Lowdb_pinAuthentication/backend', 'templates/react_CRUD:Lowdb_pinAuthentication/backend/src', 'templates/react_CRUD:Lowdb_pinAuthentication/backend/src/data']


function reactPinAuthentication(answers, from, to) {

    console.log(`create files...`)


    setTimeout(() => {
        copyFiles(pathArrayReactPinFrom, pathArrayReactPinTo, from, to)
        console.log(chalk.green(`react CRUD pin authentication with lowdb completed!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
    }, 2000)

}

export default reactPinAuthentication