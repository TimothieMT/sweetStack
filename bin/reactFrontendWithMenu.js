import chalk from "chalk";
import createCopy from "./copyFunction.js";
import reactHooks from "./reactHooks.js";

const pathArrayTo = ['frontendWithMenu', 'frontendWithMenu/src', 'frontendWithMenu/src/assets', 'frontendWithMenu/src/pages', 'frontendWithMenu/public', 'frontendWithMenu/cli']
const pathArrayFrom = ['templates/react-frontend-routes', 'templates/react-frontend-routes/src', 'templates/react-frontend-routes/src/assets', 'templates/react-frontend-routes/public', 'templates/react-frontend-routes/cli']


async function reactFrontendWithMenu(answers, from, to) {
    //CREATE REACT FRONTEND

    await createCopy(pathArrayFrom, pathArrayTo, from, to)


    console.log(chalk.green(`react frontend with menu successfully!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
}

export default reactFrontendWithMenu