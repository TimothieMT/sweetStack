import reactHooks from "./reactHooks.js";
import copyFiles from "./copyFiles.js";
import * as sweet from "./sweet.js";

function reactFrontend(answers, from, to) {

    const pathArrayReactTo = [`${answers.name}-frontend`, 'frontend', 'frontend/src', 'frontend/public']
    const pathArrayReactFrom = ['templates/react_frontend', 'templates/react_frontend/src', 'templates/react_frontend/public']

    copyFiles(pathArrayReactFrom, pathArrayReactTo, from, to)
    reactHooks(answers, from, to + `/${pathArrayReactTo[0]}/src/App.tsx`)
    sweet.renameFileSync(`${to}/${pathArrayReactTo[0]}/gitignore`, `${to}/${pathArrayReactTo[0]}/.gitignore`)
    sweet.npmInstaller(`${to}/${pathArrayReactTo[0]}`)
    sweet.gitInit(`${to}/${pathArrayReactTo[0]}`)
}


export default reactFrontend