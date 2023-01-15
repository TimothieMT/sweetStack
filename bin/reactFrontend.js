import chalk from "chalk";
import reactHooks from "./reactHooks.js";
import copyFiles from "./copyFiles.js";

const pathArrayReactTo = ['frontend', 'frontend/src', 'frontend/public']
const pathArrayReactFrom = ['templates/react-frontend', 'templates/react-frontend/src', 'templates/react-frontend/public']

function reactFrontend(answers, from, to) {
    //CREATE REACT FRONTEND

    console.log(`create files...`)


    setTimeout(() => {
        copyFiles(pathArrayReactFrom, pathArrayReactTo, from, to)
        setTimeout(() => {
            reactHooks(answers, from, to + '/frontend/src/App.tsx')
        }, 1000)
        console.log(chalk.green(`react frontend completed!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
    }, 2000)

}

export default reactFrontend