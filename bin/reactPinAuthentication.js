import copyFiles from "./copyFiles.js";
import chalk from "chalk";


const pathArrayReactPinTo = ['frontend','frontend/src', 'frontend/src/assets',
    'frontend/src/components', 'frontend/src/styles', 'frontend/src/pages', 'frontend/public', 'frontend/cli',
]
const pathArrayReactPinFrom = ['templates/react_CRUDLowdb_pinAuthentication', 'templates/react_CRUDLowdb_pinAuthentication/dev', 'templates/react_CRUDLowdb_pinAuthentication/src', 'templates/react_CRUDLowdb_pinAuthentication/frontend/src/assets', 'templates/react_CRUDLowdb_pinAuthentication/public', 'templates/react_CRUDLowdb_pinAuthentication/cli'
]


function reactPinAuthentication(answers, from, to) {

    setTimeout(() => {
        copyFiles(pathArrayReactPinFrom, pathArrayReactPinTo, from, to)
        console.log(chalk.green(`react CRUD pin authentication with lowdb frontend completed!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
    }, 2000)

}

export default reactPinAuthentication