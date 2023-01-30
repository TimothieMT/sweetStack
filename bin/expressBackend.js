import copyFiles from "./copyFiles.js";
import * as sweet from "./sweet.js";

function expressBackend(answers, from, to) {

    const pathArrayExpressBackendTo = [`${answers.name}-backend`, 'backend', 'backend/dist', 'backend/src']
    const pathArrayExpressBackendFrom = ['templates/express_backend', 'templates/express_backend/dist', 'templates/express_backend/src']


    copyFiles(pathArrayExpressBackendFrom, pathArrayExpressBackendTo, from, to)
    sweet.npmInstaller(`${to}/${pathArrayExpressBackendTo[0]}`)
}

export default expressBackend;