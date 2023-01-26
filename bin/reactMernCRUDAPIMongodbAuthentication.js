import copyFiles from "./copyFiles.js";
import * as sweet from './sweet.js';

function reactMernCRUDAPIMongodbAuthentication(answers, from, to) {

    const pathArrayMernTo = [`${answers.name}-frontend`, 'frontend/src', 'frontend/public', 'frontend/dev', 'frontend/cli', 'frontend/src/pages']
    const pathArrayMernFrom = ['templates/react_mern_crud_mongodb', 'templates/react_mern_crud_mongodb/src', 'templates/react_mern_crud_mongodb/public', 'templates/react_mern_crud_mongodb/dev', 'templates/react_mern_crud_mongodb/cli', 'templates/react_mern_crud_mongodb/src/pages']


    copyFiles(pathArrayMernFrom, pathArrayMernTo, from, to)
    sweet.renameFileSync(`${to}/${pathArrayMernTo[0]}/env`, `${to}/${pathArrayMernTo[0]}/.env`)
    sweet.renameFileSync(`${to}/${pathArrayMernTo[0]}/gitignore`, `${to}/${pathArrayMernTo[0]}/.gitignore`)
    sweet.renameFileSync(`${to}/${pathArrayMernTo[0]}/prettierrc`, `${to}/${pathArrayMernTo[0]}/.prettierrc`)
    sweet.npmInstaller(`${to}/${pathArrayMernTo[0]}`)

}

export default reactMernCRUDAPIMongodbAuthentication