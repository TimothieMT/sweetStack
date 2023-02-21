import reactHooks from "./reactHooks.js";
import copyFiles from "./copyFiles.js";
import * as sweet from "./sweet.js";
import path from "path";

function reactFrontend(answers, from, to) {

    const pathArrayReactTo = [`${answers.name}`, 'frontend', 'frontend/src', 'frontend/public']
    const pathArrayReactFrom = ['templates/react_frontend', 'templates/react_frontend/src', 'templates/react_frontend/public']

    copyFiles(pathArrayReactFrom, pathArrayReactTo, from, path.resolve())
    reactHooks(answers, from , path.resolve() + `/${pathArrayReactTo[0]}/src/App.tsx`)
    sweet.renameFileSync(`${path.resolve()}/${pathArrayReactTo[0]}/gitignore`, `${path.resolve()}/${pathArrayReactTo[0]}/.gitignore`)
    sweet.npmInstaller(`${path.resolve()}/${pathArrayReactTo[0]}`)
    sweet.gitInit(`${path.resolve()}/${pathArrayReactTo[0]}`)
}


export default reactFrontend