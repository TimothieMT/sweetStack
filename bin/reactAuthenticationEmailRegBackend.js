import copyFiles from "./copyFiles.js";
import * as sweet from "./sweet.js";

function reactAuthenticationEmailRegBackend(answers, from, to) {

    const pathArrayAuthenticationEmailRegBackendTo = [`${answers.name}-backend`, 'backend', 'backend/src', 'backend/src/pages', 'backend/public']
    const pathArrayAuthenticationEmailRegBackendFrom = ['templates/react_authentication_email_registration_backend', 'templates/react_authentication_email_registration_backend/backend/public', 'templates/react_authentication_email_registration_backend/backend/src',
        'templates/react_authentication_email_registration_backend/backend/src/pages']


    copyFiles(pathArrayAuthenticationEmailRegBackendFrom, pathArrayAuthenticationEmailRegBackendTo, from, to)
    sweet.renameFileSync(`${to}/${pathArrayAuthenticationEmailRegBackendTo[0]}/gitignore`, `${to}/${pathArrayAuthenticationEmailRegBackendTo[0]}/.gitignore`)
    sweet.renameFileSync(`${to}/${pathArrayAuthenticationEmailRegBackendTo[0]}/prettierrc`, `${to}/${pathArrayAuthenticationEmailRegBackendTo[0]}/.prettierrc`)
    sweet.renameFileSync(`${to}/${pathArrayAuthenticationEmailRegBackendTo[0]}/env`, `${to}/${pathArrayAuthenticationEmailRegBackendTo[0]}/.env`)
    sweet.npmInstaller(`${to}/${pathArrayAuthenticationEmailRegBackendTo[0]}`)
    sweet.createDB(answers['connectionString'], answers.name, 'users')
    sweet.dataImportCollection(`${answers['connectionString']}/${answers.name}`, answers.name, 'users', `${to}/${pathArrayAuthenticationEmailRegBackendTo[0]}/dev/_users.json`)
    sweet.replaceData('@connectionString', `${answers['connectionString']}/${answers.name}`, `${to}/${pathArrayAuthenticationEmailRegBackendTo[0]}/.env`)
    sweet.replaceData('@email', `${answers['email']}`, `${to}/${pathArrayAuthenticationEmailRegBackendTo[0]}/.env`)
    sweet.replaceData('@emailpassword', `${answers['emailpassword']}`, `${to}/${pathArrayAuthenticationEmailRegBackendTo[0]}/.env`)
}

export default reactAuthenticationEmailRegBackend