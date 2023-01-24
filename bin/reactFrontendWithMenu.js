import chalk from "chalk";
import copyFiles from "./copyFiles.js";

function reactFrontendWithMenu(answers, from, to) {

const pathArrayReactMenuTo = [`${answers.name}-frontend`,'frontend','frontend/src', 'frontend/src/assets', 'frontend/src/pages', 'frontend/public', 'frontend/cli']
const pathArrayReactMenuFrom = ['templates/react_frontend_routes', 'templates/react_frontend_routes/src', 'templates/react_frontend_routes/src/assets', 'templates/react_frontend_routes/public', 'templates/react_frontend_routes/cli']

    setTimeout(() => {
        copyFiles(pathArrayReactMenuFrom, pathArrayReactMenuTo, from, to)
        console.log(chalk.green(`react frontend with menu completed!
            
            cd ${answers.name}
            cd ${answers.name}-frontend
            npm install
            npm run dev`))
    }, 2000)

}

export default reactFrontendWithMenu