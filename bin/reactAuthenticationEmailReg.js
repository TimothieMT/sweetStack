import copyFiles from "./copyFiles.js";
import * as sweet from "./sweet.js";

function reactAuthenticationEmailReg(answers, from, to) {

    const pathArrayAuthenticationEmailRegTo = [`${answers.name}-frontend`, 'frontend', 'frontend/src', 'frontend/src/models', 'frontend/dev', 'frontend/build', 'frontend/build/models']
    const pathArrayAuthenticationEmailRegFrom = ['templates/react_authentication_email_registration', 'templates/react_authentication_email_registration/frontend/src', 'templates/react_authentication_email_registration/frontend/src/models',
        'templates/react_authentication_email_registration/frontend/dev', 'templates/react_authentication_email_registration/frontend/build', 'templates/react_authentication_email_registration/frontend/build/models']


    copyFiles(pathArrayAuthenticationEmailRegFrom, pathArrayAuthenticationEmailRegTo, from, to)
    sweet.renameFileSync(`${to}/${pathArrayAuthenticationEmailRegTo[0]}/gitignore`, `${to}/${pathArrayAuthenticationEmailRegTo[0]}/.gitignore`)
    sweet.renameFileSync(`${to}/${pathArrayAuthenticationEmailRegTo[0]}/prettierrc`, `${to}/${pathArrayAuthenticationEmailRegTo[0]}/.prettierrc`)
    sweet.npmInstaller(`${to}/${pathArrayAuthenticationEmailRegTo[0]}`)
}

export default reactAuthenticationEmailReg