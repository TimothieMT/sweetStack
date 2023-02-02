import copyFiles from "./copyFiles.js";
import * as sweet from "./sweet.js";

function reactMernCRUDAPIMongodbAuthenticationBackend(answers, from, to) {

    const pathArrayMernTo = [`${answers.name}-backend`, 'backend', 'backend/src', 'backend/src/models', 'backend/dev']
    const pathArrayMernFrom = ['templates/react_mern_crud_mongodb_backend', 'templates/react_mern_crud_mongodb_backend/dev', 'templates/react_mern_crud_mongodb_backend/src', 'templates/react_mern_crud_mongodb_backend/src/models']


    copyFiles(pathArrayMernFrom, pathArrayMernTo, from, to)
    sweet.renameFileSync(`${to}/${pathArrayMernTo[0]}/env`, `${to}/${pathArrayMernTo[0]}/.env`)
    sweet.renameFileSync(`${to}/${pathArrayMernTo[0]}/gitignore`, `${to}/${pathArrayMernTo[0]}/.gitignore`)
    sweet.npmInstaller(`${to}/${pathArrayMernTo[0]}`)
    sweet.createDB(answers['connectionString'], answers.name, 'books')
    sweet.dataImportCollection(`${answers['connectionString']}/${answers.name}`, answers.name, 'books', `${to}/${pathArrayMernTo[0]}/dev/books.json`)
    sweet.replaceData('@appName', answers.name, `${to}/${pathArrayMernTo[0]}/.env`)
    sweet.replaceData('@connectionString', `${answers['connectionString']}/${answers.name}`, `${to}/${pathArrayMernTo[0]}/.env`)
}

export default reactMernCRUDAPIMongodbAuthenticationBackend