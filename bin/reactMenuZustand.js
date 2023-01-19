import copyFiles from "./copyFiles.js";
import reactHooks from "./reactHooks.js";
import chalk from "chalk";

const pathArrayReactZustandTo = ['frontend','frontend/src', 'frontend/src/assets', 'frontend/src/pages', 'frontend/public', 'frontend/cli']
const pathArrayReactZustandFrom = ['templates/react-routes-zustand', 'templates/react-routes-zustand/src', 'templates/react-routes-zustand/src/assets', 'templates/react-routes-zustand/public', 'templates/react-routes-zustand/cli']

function menuZustand(answers, from, to) {

    setTimeout(() => {
        copyFiles(pathArrayReactZustandFrom, pathArrayReactZustandTo, from, to)
        setTimeout(() => {
            reactHooks(answers, from, to + '/frontend/src/App.tsx')
        }, 1000)
        console.log(chalk.green(`react frontend with menu and zustand completed!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
    }, 2000)

}

export default menuZustand