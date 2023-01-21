import chalk from "chalk";
import copyFiles from "./copyFiles.js";
import reactHooks from "./reactHooks.js";

const pathArrayReactMenuTo = ['frontend','frontend/src', 'frontend/src/assets', 'frontend/src/pages', 'frontend/public', 'frontend/cli']
const pathArrayReactMenuFrom = ['templates/react_frontend_routes', 'templates/react_frontend_routes/src', 'templates/react_frontend_routes/src/assets', 'templates/react_frontend_routes/public', 'templates/react_frontend_routes/cli']


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