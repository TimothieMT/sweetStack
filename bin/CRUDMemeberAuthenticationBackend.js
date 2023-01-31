import copyFiles from "./copyFiles.js";
import * as sweet from "./sweet.js";

function CRUDMemberAuthenticationBackend(answers, from, to) {

    const pathArrayReactMemberTo = [`${answers.name}-backend`, 'backend', 'backend/src', 'backend/dev', 'backend/cli', 'backend/src/models']
    const pathArrayReactMemberFrom = ['templates/CRUD_member_authentication_backend', 'templates/CRUD_member_authentication_backend/src', 'templates/CRUD_member_authentication_backend/src/models', 'templates/CRUD_member_authentication_backend/dev', 'templates/CRUD_member_authentication_backend/cli']


    copyFiles(pathArrayReactMemberFrom, pathArrayReactMemberTo, from, to)
    sweet.renameFileSync(`${to}/${pathArrayReactMemberTo[0]}/env`, `${to}/${pathArrayReactMemberTo[0]}/.env`)
    sweet.renameFileSync(`${to}/${pathArrayReactMemberTo[0]}/gitignore`, `${to}/${pathArrayReactMemberTo[0]}/.gitignore`)
    sweet.npmInstaller(`${to}/${pathArrayReactMemberTo[0]}`)
    sweet.createDB('mongodb://localhost:27017', answers.name, 'books', 'users')
}

export default CRUDMemberAuthenticationBackend