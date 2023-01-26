import copyFiles from "./copyFiles.js";
import * as sweet from "./sweet.js";


function angularFrontend(from, to, answers) {

const pathArrayAngularFrontendTo = [`${answers.name}-frontend`, 'frontend/src', 'frontend/public', 'frontend/src/app', 'frontend/src/assets']
const pathArrayAngularFrontendFrom = ['templates/angular_frontend', 'templates/angular_frontend/public', 'templates/angular_frontend/src', 'templates/angular_frontend/src/assets', 'templates/backend_components']

    copyFiles(pathArrayAngularFrontendFrom, pathArrayAngularFrontendTo, from, to)
    sweet.npmInstaller(`${to}/${pathArrayAngularFrontendTo[0]}`)


}

export default angularFrontend;