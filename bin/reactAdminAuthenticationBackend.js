import copyFiles from "./copyFiles.js";
import * as sweet from "./sweet.js";

function reactAdminAuthenticationBackend(answers, from, to) {

    const pathArrayReactAdminTo = [`${answers.name}-backend`, 'backend', 'backend/src', 'backend/src/data']
    const pathArrayReactAdminFrom = ['templates/react_adminAuthentication_backend', 'templates/react_adminAuthentication_backend/src', 'templates/react_adminAuthentication_backend/src/data']


    copyFiles(pathArrayReactAdminFrom, pathArrayReactAdminTo, from, to)
    sweet.renameFileSync(`${to}/${pathArrayReactAdminTo[0]}/env`, `${to}/${pathArrayReactAdminTo[0]}/.env`)
    sweet.renameFileSync(`${to}/${pathArrayReactAdminTo[0]}/gitignore`, `${to}/${pathArrayReactAdminTo[0]}/.gitignore`)
    sweet.npmInstaller(`${to}/${pathArrayReactAdminTo[0]}`)
}

export default reactAdminAuthenticationBackend