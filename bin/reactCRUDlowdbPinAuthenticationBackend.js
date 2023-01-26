import copyFiles from "./copyFiles.js";
import * as sweet from "./sweet.js";


function reactPinAuthenticationBackend(answers, from, to) {

    const pathArrayReactPinTo = [`${answers.name}-backend`, 'backend', 'backend/src', 'backend/src/data']
    const pathArrayReactPinFrom = ['templates/react_CRUDLowdb_pinAuthentication_backend', 'templates/react_CRUDLowdb_pinAuthentication_backend/src', 'templates/react_CRUDLowdb_pinAuthentication_backend/src/data']


    copyFiles(pathArrayReactPinFrom, pathArrayReactPinTo, from, to)
    sweet.renameFileSync(`${to}/${pathArrayReactPinTo[0]}/env`, `${to}/${pathArrayReactPinTo[0]}/.env`)
    sweet.renameFileSync(`${to}/${pathArrayReactPinTo[0]}/gitignore`, `${to}/${pathArrayReactPinTo[0]}/.gitignore`)
    sweet.npmInstaller(`${to}/${pathArrayReactPinTo[0]}`)
}

export default reactPinAuthenticationBackend