import copyFiles from "./copyFiles.js";
import * as sweet from "./sweet.js";

function reactAuthenticationEmailRegBackend(answers, from, to) {

    const pathArrayAuthenticationEmailRegBackendTo = [`${answers.name}-backend`, 'backend', 'backend/src', 'backend/src/pages', 'backend/public']
    const pathArrayAuthenticationEmailRegBackendFrom = ['templates/react_authentication_email_registration_backend', 'templates/react_authentication_email_registration_backend/backend/public', 'templates/react_authentication_email_registration_backend/backend/src',
        'templates/react_authentication_email_registration_backend/backend/src/pages']


    copyFiles(pathArrayAuthenticationEmailRegBackendFrom, pathArrayAuthenticationEmailRegBackendTo, from, to)
    sweet.renameFileSync(`${to}/${pathArrayAuthenticationEmailRegBackendTo[0]}/gitignore`, `${to}/${pathArrayAuthenticationEmailRegBackendTo[0]}/.gitignore`)
    sweet.renameFileSync(`${to}/${pathArrayAuthenticationEmailRegBackendTo[0]}/prettierrc`, `${to}/${pathArrayAuthenticationEmailRegBackendTo[0]}/.prettierrc`)
    sweet.npmInstaller(`${to}/${pathArrayAuthenticationEmailRegBackendTo[0]}`)
}

export default reactAuthenticationEmailRegBackend