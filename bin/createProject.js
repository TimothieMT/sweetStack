import chalk from "chalk";
import reactFrontend from "./reactFrontend.js";
import vueFrontend from "./vueFrontend.js";
import angularFrontend from "./angularFrontend.js";
import expressBackend from "./expressBackend.js";
import angularBackend from "./angularBackend.js";
import reactFrontendWithMenu from "./reactFrontendWithMenu.js";
import reactMenuZustand from './reactMenuZustand.js'
import reactPinAuthentication from './reactPinAuthentication.js'
import reactAdminAuthentication from './reactAdminAthentication.js'
import react_sqlite_CRUD from './react_sqlite_CRUD.js'
import react_CRUDLowdb_pinAuthentication_backend from "./react_CRUD:lowdb_pinAuthentication_backend.js";
import reactAdminAuthenticationBackend from "./react_adminAuthentication_backend.js";
import react_sqlite_CRUDBackend from "./react-sqlite_CRUD_backend.js";


function createProject(answers, absolutePath, destPath) {


//REACT START
    if (answers.name !== '' && answers['frontend'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'menu included Zustand') {
        console.log(`create files...`)
        reactMenuZustand(answers, absolutePath, destPath)
    }
    if (answers.name !== '' && answers['frontend'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'CRUD/Lowdb and PIN authentication') {
        console.log(`create files...`)
        reactPinAuthentication(answers, absolutePath, destPath)
        react_CRUDLowdb_pinAuthentication_backend(answers, absolutePath, destPath)
    }
    if (answers.name !== '' && answers['frontend'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'admin authentication') {
        console.log(`create files...`)
        reactAdminAuthentication(answers, absolutePath, destPath)
        reactAdminAuthenticationBackend(answers, absolutePath, destPath)
    }
    if (answers.name !== '' && answers['frontend'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'CRUD API which adds/edits/deletes data from a database') {
        console.log(`create files...`)
        react_sqlite_CRUD(answers, absolutePath, destPath)
        react_sqlite_CRUDBackend(answers, absolutePath, destPath)
    }
    if (answers.name !== '' && answers['frontend'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'menu' && answers['backend'] === 'yes') {
        console.log(`create files...`)
        reactFrontendWithMenu(answers, absolutePath, destPath)
        expressBackend(answers, absolutePath, destPath)
    }
    if (answers.name !== '' && answers['frontend'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'none' && answers['backend'] === 'yes') {
        console.log(`create files...`)
        reactFrontend(answers, absolutePath, destPath)
        expressBackend(answers, absolutePath, destPath)
    }
    if (answers.name !== '' && answers['frontend'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'none' && answers['backend'] === 'no') {
        console.log(`create files...`)
        reactFrontend(answers, absolutePath, destPath)
    }
    if (answers.name !== '' && answers['frontend'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'menu' && answers['backend'] === 'no') {
        console.log(`create files...`)
        reactFrontendWithMenu(answers, absolutePath, destPath)
    }

//REACT END

//VUE START
    if (answers.name !== '' && answers['frontend'] === chalk.green('vue') && answers['backend'] === 'yes') {
        console.log(`create files...`)
        vueFrontend(absolutePath, destPath, answers)
        expressBackend(answers, absolutePath, destPath)
    }
    if (answers.name !== '' && answers['frontend'] === chalk.green('vue') && answers['backend'] === 'no') {
        console.log(`create files...`)
        vueFrontend(absolutePath, destPath, answers)
    }
//VUE END

//ANGULAR START
    if (answers.name !== '' && answers['frontend'] === chalk.hex('#ff7247')('angular') && answers['backend'] === 'yes') {
        console.log(`create files...`)
        angularBackend(absolutePath, destPath, answers)
    }
    if (answers.name !== '' && answers['frontend'] === chalk.hex('#ff7247')('angular') && answers['backend'] === 'no') {
        console.log(`create files...`)
        angularFrontend(absolutePath, destPath, answers)
    }
//ANGULAR END

   return true

}


export default createProject