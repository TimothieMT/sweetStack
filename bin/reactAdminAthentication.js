import copyFiles from "./copyFiles.js";
import reactHooks from "./reactHooks.js";
import chalk from "chalk";

const pathArrayReactAdminTo = ['adminAuthentication', 'adminAuthentication/src', 'adminAuthentication/public', 'adminAuthentication/dev', 'adminAuthentication/cli', 'adminAuthentication/src/pages',
    'adminBackend', 'adminBackend/src']
const pathArrayReactAdminFrom = ['templates/react_adminAuthentication', 'templates/react_adminAuthentication/frontend/src', 'templates/react_adminAuthentication/frontend/public',
    'templates/react_adminAuthentication/frontend/dev', 'templates/react_adminAuthentication/frontend/cli', 'templates/react_adminAuthentication/frontend/src/pages',
    'templates/react_adminAuthentication/backend', 'templates/react_adminAuthentication/backend/src']

function reactAdminAuthentication(answers, from, to) {

    console.log(`
    create files...`)


    setTimeout(() => {
        copyFiles(pathArrayReactAdminFrom, pathArrayReactAdminTo, from, to)
        reactHooks(answers, from, to + '/frontend/src/App.tsx')
        console.log(chalk.green(`    react admin authentication completed!
            
            cd ${answers.name}
            cd adminAuthentication
            cd frontend
            npm install
            npm run dev
            cd backend
            npm install
            npm start`))
    }, 2000)
}

export default reactAdminAuthentication