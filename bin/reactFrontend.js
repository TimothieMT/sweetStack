import chalk from "chalk";
import reactHooks from "./reactHooks.js";
import copyFiles from "./copyFiles.js";

function reactFrontend(answers, from, to) {

const pathArrayReactTo = [`${answers.name}-frontend`,'frontend','frontend/src', 'frontend/public']
const pathArrayReactFrom = ['templates/react_frontend', 'templates/react_frontend/src', 'templates/react_frontend/public']

    setTimeout(() => {
        copyFiles(pathArrayReactFrom, pathArrayReactTo, from, to)
        setTimeout(() => {
            reactHooks(answers, from, to + '/frontend/src/App.tsx')
        }, 1000)
        console.log(chalk.green(`react frontend completed!
            
            cd ${answers.name}
            cd ${answers.name}-frontend
            npm install
            npm run dev`))
    }, 2000)

}

export default reactFrontend