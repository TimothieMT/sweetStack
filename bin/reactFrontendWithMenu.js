import chalk from "chalk";
import copyFiles from "./copyFiles.js";
import reactHooks from "./reactHooks.js";

const pathArrayReactMenuTo = ['frontend','frontend/src', 'frontend/src/assets', 'frontend/src/pages', 'frontend/public', 'frontend/cli']
const pathArrayReactMenuFrom = ['templates/react-frontend-routes', 'templates/react-frontend-routes/src', 'templates/react-frontend-routes/src/assets', 'templates/react-frontend-routes/public', 'templates/react-frontend-routes/cli']


function reactFrontendWithMenu(answers, from, to) {

    setTimeout(() => {
        copyFiles(pathArrayReactMenuFrom, pathArrayReactMenuTo, from, to)
        setTimeout(() => {
            reactHooks(answers, from, to + '/frontend/src/App.tsx')
        }, 1000)
        console.log(chalk.green(`react frontend with menu completed!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
    }, 2000)

}

export default reactFrontendWithMenu