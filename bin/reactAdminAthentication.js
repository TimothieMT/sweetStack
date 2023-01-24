import copyFiles from "./copyFiles.js";
import chalk from "chalk";

function reactAdminAuthentication(answers, from, to) {

    const pathArrayReactAdminTo = [`${answers.name}-frontend`, 'frontend', 'frontend/src', 'frontend/public', 'frontend/dev', 'frontend/cli', 'frontend/src/pages']
    const pathArrayReactAdminFrom = ['templates/react_adminAuthentication', 'templates/react_adminAuthentication/frontend/src', 'templates/react_adminAuthentication/frontend/public',
        'templates/react_adminAuthentication/frontend/dev', 'templates/react_adminAuthentication/frontend/cli', 'templates/react_adminAuthentication/frontend/src/pages']

    setTimeout(() => {
        copyFiles(pathArrayReactAdminFrom, pathArrayReactAdminTo, from, to)
        console.log(chalk.green(`react admin authentication frontend completed!
            
            cd ${answers.name}
            cd ${answers.name}-frontend
            npm install
            npm run dev`))
    }, 2000)
}

export default reactAdminAuthentication