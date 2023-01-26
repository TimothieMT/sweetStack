import copyFiles from "./copyFiles.js";
import * as sweet from "./sweet.js";

function angularBackend(from, to, answers) {


        const pathArrayAngularBackendTo = [`${answers.name}-backend`, 'backend/public', 'backend/src', 'backend/src/assets', 'backend/src/app']
        const pathArrayAngularBackendFrom = ['templates/angular_frontend', 'templates/angular_frontend/public', 'templates/angular_frontend/src', 'templates/angular_frontend/src/assets', 'templates/angular_backend_components']


        copyFiles(pathArrayAngularBackendFrom, pathArrayAngularBackendTo, from, to)
        sweet.npmInstaller(`${to}/${pathArrayAngularBackendTo[0]}`)

}

export default angularBackend;