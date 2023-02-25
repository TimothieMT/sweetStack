import copyFiles from "./copyFiles.js";
import * as sweet from "./sweet.js";


function angularFrontendCDP(from, to, answers) {

    const pathArrayAngularFrontendCDPTo = [`${answers.name}-frontend`, 'frontend/src', 'frontend/public', 'frontend/src/app', 'frontend/src/app/employees', 'frontend/src/app/hone', 'frontend/src/app/info', 'frontend/src/app/info-box', 'frontend/src/app/top-menu', 'frontend/src/assets', 'frontend/src/assets/images', 'frontend/src/shared']
    const pathArrayAngularFrontendCDPFrom = ['templates/angular_frontend_components_directives_pipes', 'templates/angular_frontend_components_directives_pipes/public', 'templates/angular_frontend_components_directives_pipes/src', 'templates/angular_frontend_components_directives_pipes/src/employees', 'templates/angular_frontend_components_directives_pipes/src/home', 'templates/angular_frontend_components_directives_pipes/src/info', 'templates/angular_frontend_components_directives_pipes/src/info-box', 'templates/angular_frontend_components_directives_pipes/src/top-menu', 'templates/angular_frontend_components_directives_pipes/src/assets', 'templates/angular_frontend_components_directives_pipes/src/assets/images', 'templates/angular_frontend_components_directives_pipes/shared']

    copyFiles(pathArrayAngularFrontendCDPFrom, pathArrayAngularFrontendCDPTo, from, to)
    //sweet.npmInstaller(`${to}/${pathArrayAngularFrontendCDPTo[0]}`)


}

export default angularFrontendCDP;