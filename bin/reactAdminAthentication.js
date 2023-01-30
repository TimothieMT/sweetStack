import copyFiles from "./copyFiles.js";
import * as sweet from "./sweet.js";

function reactAdminAuthentication(answers, from, to) {

    const pathArrayReactAdminTo = [`${answers.name}-frontend`, 'frontend', 'frontend/src', 'frontend/public', 'frontend/dev', 'frontend/cli', 'frontend/src/pages']
    const pathArrayReactAdminFrom = ['templates/react_adminAuthentication', 'templates/react_adminAuthentication/frontend/src', 'templates/react_adminAuthentication/frontend/public',
        'templates/react_adminAuthentication/frontend/dev', 'templates/react_adminAuthentication/frontend/cli', 'templates/react_adminAuthentication/frontend/src/pages']


    copyFiles(pathArrayReactAdminFrom, pathArrayReactAdminTo, from, to)
    sweet.renameFileSync(`${to}/${pathArrayReactAdminTo[0]}/env`, `${to}/${pathArrayReactAdminTo[0]}/.env`)
    sweet.renameFileSync(`${to}/${pathArrayReactAdminTo[0]}/gitignore`, `${to}/${pathArrayReactAdminTo[0]}/.gitignore`)
    sweet.renameFileSync(`${to}/${pathArrayReactAdminTo[0]}/prettierrc`, `${to}/${pathArrayReactAdminTo[0]}/.prettierrc`)
    sweet.npmInstaller(`${to}/${pathArrayReactAdminTo[0]}`)
}

export default reactAdminAuthentication