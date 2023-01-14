import copyFiles from "./copyFiles.js";
import reactHooks from "./reactHooks.js";
import chalk from "chalk";

const pathArrayReactAdminTo = ['adminFrontend', 'adminFrontend/src', 'adminFrontend/public', 'adminFrontend/dev', 'adminFrontend/cli', 'adminFrontend/src/pages',
    'adminBackend', 'adminBackend/src']
const pathArrayReactAdminFrom = ['templates/react_adminAuthentication', 'templates/react_adminAuthentication/admin_frontend/src', 'templates/react_adminAuthentication/admin_frontend/public',
    'templates/react_adminAuthentication/admin_frontend/dev', 'templates/react_adminAuthentication/admin_frontend/cli', 'templates/react_adminAuthentication/admin_frontend/src/pages',
    'templates/react_adminAuthentication/admin_backend', 'templates/react_adminAuthentication/admin_backend/src']

function reactAdminAuthentication(answers, from, to) {

    console.log(`
    create files...`)


    setTimeout(() => {
        copyFiles(pathArrayReactAdminFrom, pathArrayReactAdminTo, from, to)
        reactHooks(answers, from, to + '/adminFrontend/src/App.tsx')
        console.log(chalk.green(`    react admin authentication completed!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
    }, 2000)
}

export default reactAdminAuthentication