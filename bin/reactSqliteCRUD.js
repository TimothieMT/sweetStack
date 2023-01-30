import copyFiles from "./copyFiles.js";
import * as sweet from "./sweet.js";

function reactSqliteCRUD(answers, from, to) {


    const pathArrayReactApiTo = [`${answers.name}-frontend`, 'frontend/src', 'frontend/src/components', 'frontend/src/pages', 'frontend/public', 'frontend/cli', "frontend/dev"]
    const pathArrayReactApiFrom = ['templates/react_sqlite_CRUD', 'templates/react_sqlite_CRUD/dev', 'templates/react_sqlite_CRUD/src', 'templates/react_sqlite_CRUD/src/pages', 'templates/react_sqlite_CRUD/src/components', 'templates/react_sqlite_CRUD/public', 'templates/react_sqlite_CRUD/cli']


    copyFiles(pathArrayReactApiFrom, pathArrayReactApiTo, from, to)
    sweet.renameFileSync(`${to}/${pathArrayReactApiTo[0]}/env`, `${to}/${pathArrayReactApiTo[0]}/.env`)
    sweet.renameFileSync(`${to}/${pathArrayReactApiTo[0]}/gitignore`, `${to}/${pathArrayReactApiTo[0]}/.gitignore`)
    sweet.renameFileSync(`${to}/${pathArrayReactApiTo[0]}/prettierrc`, `${to}/${pathArrayReactApiTo[0]}/.prettierrc`)
    sweet.npmInstaller(`${to}/${pathArrayReactApiTo[0]}`)

}

export default reactSqliteCRUD