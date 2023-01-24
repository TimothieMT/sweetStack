import copyFiles from "./copyFiles.js";
import chalk from "chalk";

function reactMernCRUDAPIMongodbAuthentication(answers, from, to) {

    const pathArrayMernTo = [`${answers.name}-frontend`, 'frontend/src', 'frontend/public', 'frontend/dev', 'frontend/cli', 'frontend/src/pages']
    const pathArrayMernFrom = ['templates/react_mern_crud_mongodb', 'templates/react_mern_crud_mongodb/src', 'templates/react_mern_crud_mongodb/public', 'templates/react_mern_crud_mongodb/dev', 'templates/react_mern_crud_mongodb/cli', 'templates/react_mern_crud_mongodb/src/pages']

    setTimeout(() => {
        copyFiles(pathArrayMernFrom, pathArrayMernTo, from, to)
        console.log(chalk.green(`react MERN CRUD API MongoDB authentication frontend completed!
            
            cd ${answers.name}
            cd ${answers.name}frontend
            npm install
            npm run dev`))
    }, 2000)
}

export default reactMernCRUDAPIMongodbAuthentication