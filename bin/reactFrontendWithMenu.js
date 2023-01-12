import chalk from "chalk";
import copyFiles from "./copyFiles.js";
import reactHooks from "./reactHooks.js";

const pathArrayReactMenuTo = ['frontendWithMenu', 'frontendWithMenu/src', 'frontendWithMenu/src/assets', 'frontendWithMenu/src/pages', 'frontendWithMenu/public', 'frontendWithMenu/cli']
const pathArrayReactMenuFrom = ['templates/react-frontend-routes', 'templates/react-frontend-routes/src', 'templates/react-frontend-routes/src/assets', 'templates/react-frontend-routes/public', 'templates/react-frontend-routes/cli']


function reactFrontendWithMenu(answers, from, to) {
    //CREATE REACT FRONTEND

    console.log(`
    create files...`)


    setTimeout(() => {
        copyFiles(pathArrayReactMenuFrom, pathArrayReactMenuTo, from, to)
        reactHooks(answers, from, to + '/frontendWithMenu/src/App.tsx')
        console.log(chalk.green(`    react frontend with menu completed!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
    }, 2000)

}

export default reactFrontendWithMenu