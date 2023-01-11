import chalk from "chalk";
import reactFrontend from "./reactFrontend.js";
import vueFrontend from "./vueFrontend.js";
import angularFrontend from "./angularFrontend.js";
import expressBackend from "./expressBackend.js";
import angularBackend from "./angularBackend.js";
import reactFrontendWithMenu from "./reactFrontendWithMenu.js";
import reactHooks from "./reactHooks.js";


function createProject(answers, absolutePath, destPath) {

    if (answers.name !== '' && answers['frontend'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'yes' && answers['backend'] === 'no') {
        reactFrontendWithMenu(answers, absolutePath, destPath)
    } else if (answers.name !== '' && answers['frontend'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'yes' && answers['backend'] === 'yes') {
        reactFrontendWithMenu(answers, absolutePath, destPath)
        expressBackend(answers, absolutePath, destPath)
    } else if (answers.name !== '' && answers['frontend'] === chalk.hex('#A7C7E7')('react') && answers['backend'] === 'no') {
        // reactFrontend(answers, absolutePath, destPath)
    } else if (answers.name !== '' && answers['frontend'] === chalk.green('vue') && answers['backend'] === 'no') {
        vueFrontend(absolutePath, destPath, answers)
    } else if (answers.name !== '' && answers['frontend'] === chalk.hex('#ff7247')('angular') && answers['backend'] === 'no') {
        angularFrontend(absolutePath, destPath, answers)
    } else if (answers.name !== '' && answers['frontend'] === chalk.hex('#A7C7E7')('react') && answers['backend'] === 'yes') {
        reactFrontend(answers, absolutePath, destPath)
        expressBackend(answers, absolutePath, destPath)
    } else if (answers.name !== '' && answers['frontend'] === chalk.green('vue') && answers['backend'] === 'yes') {
        vueFrontend(absolutePath, destPath, answers)
        expressBackend(answers, absolutePath, destPath)
    } else if (answers.name !== '' && answers['frontend'] === chalk.hex('#ff7247')('angular') && answers['backend'] === 'yes') {
        angularBackend(absolutePath, destPath, answers)
    } else {
        console.log(chalk.red('Please select something'))
    }

}


export default createProject