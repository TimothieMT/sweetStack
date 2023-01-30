import chalk from "chalk";
import copyFiles from "./copyFiles.js";
import * as sweet from "./sweet.js";



function vueFrontend(from, to, answers) {

const pathArrayVueTo = [`${answers.name}-frontend`, 'frontend/src', 'frontend/public', 'frontend/src/assets', 'frontend/src/components', 'frontend/src/components/icons', 'frontend/src/router', 'frontend/src/views']
const pathArrayVueFrom = ['templates/vue_frontend', 'templates/vue_frontend/src', 'templates/vue_frontend/public', 'templates/vue_frontend/src/assets', 'templates/vue_frontend/src/components', 'templates/vue_frontend/src/components/icons', 'templates/vue_frontend/src/router', 'templates/vue_frontend/src/views']

    copyFiles(pathArrayVueFrom, pathArrayVueTo, from, to)
    sweet.npmInstaller(`${to}/${pathArrayVueTo[0]}`)

}

export default vueFrontend;