import copyFiles from "./copyFiles.js";
import * as sweet from "./sweet.js";

function CRUDMemberAuthentication(answers, from, to) {

    const pathArrayReactMemberTo = [`${answers.name}-frontend`, 'frontend', 'frontend/src', 'frontend/public', 'frontend/dev', 'frontend/cli', 'frontend/src/pages']
    const pathArrayReactMemberFrom = ['templates/CRUD_member_authentication', 'templates/CRUD_member_authentication/frontend/src', 'templates/CRUD_member_authentication/frontend/public',
        'templates/CRUD_member_authentication/frontend/dev', 'templates/CRUD_member_authentication/frontend/cli', 'templates/CRUD_member_authentication/frontend/src/pages']


    copyFiles(pathArrayReactMemberFrom, pathArrayReactMemberTo, from, to)
    sweet.renameFileSync(`${to}/${pathArrayReactMemberTo[0]}/env`, `${to}/${pathArrayReactMemberTo[0]}/.env`)
    sweet.renameFileSync(`${to}/${pathArrayReactMemberTo[0]}/gitignore`, `${to}/${pathArrayReactMemberTo[0]}/.gitignore`)
    sweet.renameFileSync(`${to}/${pathArrayReactMemberTo[0]}/prettierrc`, `${to}/${pathArrayReactMemberTo[0]}/.prettierrc`)
    sweet.npmInstaller(`${to}/${pathArrayReactMemberTo[0]}`)
}

export default CRUDMemberAuthentication