import copyFiles from "./copyFiles.js";
import * as sweet from "./sweet.js";

function react_sqlite_CRUDBackend(answers, from, to) {

    const pathArrayReactApiTo = [`${answers.name}-backend`, 'backend', 'backend/dist', 'backend/src/src', 'backend/src/data']
    const pathArrayReactApiFrom = ['templates/react_sqlite_CRUD_backend', 'templates/react_sqlite_CRUD_backend/src', 'templates/react_sqlite_CRUD_backend/src/data']


    copyFiles(pathArrayReactApiFrom, pathArrayReactApiTo, from, to)
    sweet.renameFileSync(`${to}/${pathArrayReactApiTo[0]}/env`, `${to}/${pathArrayReactApiTo[0]}/.env`)
    sweet.renameFileSync(`${to}/${pathArrayReactApiTo[0]}/gitignore`, `${to}/${pathArrayReactApiTo[0]}/.gitignore`)
    sweet.npmInstaller(`${to}/${pathArrayReactApiTo[0]}`)

}

export default react_sqlite_CRUDBackend