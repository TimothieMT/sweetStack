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
import reactSqliteCRUD from './reactSqliteCRUD.js'
import react_CRUDLowdb_pinAuthentication_backend from "./reactCRUDlowdbPinAuthenticationBackend.js";
import reactAdminAuthenticationBackend from "./reactAdminAuthenticationBackend.js";
import react_sqlite_CRUDBackend from "./reactSqliteCRUDBackend.js";
import reactMernCRUDAPIMongodbAuthentication from "./reactMernCRUDAPIMongodbAuthentication.js";
import reactMernCRUDAPIMongodbAuthenticationBackend from "./reactMernCRUDAPIMongodbAuthenticationBackend.js";
import * as sweet from "./sweet.js";
import CRUDMemberAuthentication from "./CRUDMemberAuthentication.js";
import CRUDMemberAuthenticationBackend from "./CRUDMemeberAuthenticationBackend.js";

function createProject(answers, absolutePath, destPath) {

//REACT START
    if (answers.name !== '' && answers['framework'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'CRUD API mongodb and authentication') {
        sweet.loader([reactMernCRUDAPIMongodbAuthentication(answers, absolutePath, destPath),
            reactMernCRUDAPIMongodbAuthenticationBackend(answers, absolutePath, destPath)], 60)
    }
    if (answers.name !== '' && answers['framework'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'menu included Zustand') {
        sweet.loader([reactMenuZustand(answers, absolutePath, destPath)], 60)
    }
    if (answers.name !== '' && answers['framework'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'CRUD/Lowdb and PIN authentication') {
        sweet.loader([reactPinAuthentication(answers, absolutePath, destPath),
            react_CRUDLowdb_pinAuthentication_backend(answers, absolutePath, destPath)], 60)
    }
    if (answers.name !== '' && answers['framework'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'admin authentication') {
        sweet.loader(
            [reactAdminAuthentication(answers, absolutePath, destPath),
                reactAdminAuthenticationBackend(answers, absolutePath, destPath)], 60)
    }
    if (answers.name !== '' && answers['framework'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'CRUD API which adds/edits/deletes data from a database') {
        sweet.loader([reactSqliteCRUD(answers, absolutePath, destPath),
            react_sqlite_CRUDBackend(answers, absolutePath, destPath)], 600)
    }
    if (answers.name !== '' && answers['framework'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'CRUD member authentication') {
        sweet.loader([CRUDMemberAuthentication(answers,absolutePath,destPath),
        CRUDMemberAuthenticationBackend(answers,absolutePath,destPath)], 60)

    }
    if (answers.name !== '' && answers['framework'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'menu' && answers['backend'] === 'yes') {
        sweet.loader([reactFrontendWithMenu(answers, absolutePath, destPath),
            expressBackend(answers, absolutePath, destPath)], 60)
    }
    if (answers.name !== '' && answers['framework'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'simple page' && answers['backend'] === 'yes') {
        sweet.loader([reactFrontend(answers, absolutePath, destPath),
            expressBackend(answers, absolutePath, destPath)], 60)
    }
    if (answers.name !== '' && answers['framework'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'simple page' && answers['backend'] === 'no') {
        sweet.loader([reactFrontend(answers, absolutePath, destPath)], 60)
    }
    if (answers.name !== '' && answers['framework'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'menu' && answers['backend'] === 'no') {
        sweet.loader([reactFrontendWithMenu(answers, absolutePath, destPath)], 60)
    }


//REACT END

//VUE START
    if (answers.name !== '' && answers['framework'] === chalk.green('vue') && answers['backend'] === 'yes') {
        sweet.loader([vueFrontend(absolutePath, destPath, answers),
            expressBackend(answers, absolutePath, destPath)], 100)
    }
    if (answers.name !== '' && answers['framework'] === chalk.green('vue') && answers['backend'] === 'no') {
        sweet.loader([vueFrontend(absolutePath, destPath, answers)], 100)
    }
//VUE END

//ANGULAR START
    if (answers.name !== '' && answers['framework'] === chalk.hex('#ff7247')('angular') && answers['backend'] === 'yes') {
        sweet.loader([angularBackend(absolutePath, destPath, answers)], 200)
    }
    if (answers.name !== '' && answers['framework'] === chalk.hex('#ff7247')('angular') && answers['backend'] === 'no') {
        sweet.loader([angularFrontend(absolutePath, destPath, answers)], 200)
    }
//ANGULAR END

}


export default createProject