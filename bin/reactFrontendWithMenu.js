import copyFiles from "./copyFiles.js";
import * as sweet from "./sweet.js";


function reactFrontendWithMenu(answers, from, to) {

    const pathArrayReactMenuTo = [`${answers.name}-frontend`, 'frontend', 'frontend/src', 'frontend/src/assets', 'frontend/src/pages', 'frontend/public', 'frontend/cli']
    const pathArrayReactMenuFrom = ['templates/react_frontend_routes', 'templates/react_frontend_routes/src', 'templates/react_frontend_routes/src/assets', 'templates/react_frontend_routes/public', 'templates/react_frontend_routes/cli']

    copyFiles(pathArrayReactMenuFrom, pathArrayReactMenuTo, from, to)
    sweet.renameFileSync(`${to}/${pathArrayReactMenuTo[0]}/gitignore`, `${to}/${pathArrayReactMenuTo[0]}/.gitignore`)
    sweet.npmInstaller(`${to}/${pathArrayReactMenuTo[0]}`)
    sweet.gitInit(`${to}/${pathArrayReactMenuTo[0]}`)

}


export default reactFrontendWithMenu