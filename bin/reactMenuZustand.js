import copyFiles from "./copyFiles.js";
import reactHooks from "./reactHooks.js";
import * as sweet from "./sweet.js";

function menuZustand(answers, from, to) {

    const pathArrayReactZustandTo = [`${answers.name}-frontend`, 'frontend', 'frontend/src', 'frontend/src/assets', 'frontend/src/pages', 'frontend/public', 'frontend/cli']
    const pathArrayReactZustandFrom = ['templates/react_routes_zustand', 'templates/react_routes_zustand/src', 'templates/react_routes_zustand/src/assets', 'templates/react_routes_zustand/public', 'templates/react_routes_zustand/cli']


    copyFiles(pathArrayReactZustandFrom, pathArrayReactZustandTo, from, to)
    reactHooks(answers, from, to + '/frontend/src/App.tsx')
    sweet.npmInstaller(`${to}/${pathArrayReactZustandTo[0]}`)

}

export default menuZustand