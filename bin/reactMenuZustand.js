import copyFiles from "./copyFiles.js";
import reactHooks from "./reactHooks.js";
import chalk from "chalk";

function menuZustand(answers, from, to) {

const pathArrayReactZustandTo = [`${answers.name}-frontend`,'frontend','frontend/src', 'frontend/src/assets', 'frontend/src/pages', 'frontend/public', 'frontend/cli']
const pathArrayReactZustandFrom = ['templates/react_routes_zustand', 'templates/react_routes_zustand/src', 'templates/react_routes_zustand/src/assets', 'templates/react_routes_zustand/public', 'templates/react_routes_zustand/cli']

    setTimeout(() => {
        copyFiles(pathArrayReactZustandFrom, pathArrayReactZustandTo, from, to)
        setTimeout(() => {
            reactHooks(answers, from, to + '/frontend/src/App.tsx')
        }, 1000)
        console.log(chalk.green(`react frontend with menu and zustand completed!
            
            cd ${answers.name}
            cd ${answers.name}-frontend
            npm install
            npm run dev`))
    }, 2000)

}

export default menuZustand