import copyFiles from "./copyFiles.js";
import reactHooks from "./reactHooks.js";
import chalk from "chalk";

const pathArrayReactZustandTo = ['menuWithZustand', 'menuWithZustand/src', 'menuWithZustand/src/assets', 'menuWithZustand/src/pages', 'menuWithZustand/public', 'menuWithZustand/cli']
const pathArrayReactZustandFrom = ['templates/react-routes-zustand', 'templates/react-routes-zustand/src', 'templates/react-routes-zustand/src/assets', 'templates/react-routes-zustand/public', 'templates/react-routes-zustand/cli']

function menuZustand(answers, from, to) {

    console.log(`
    create files...`)


    setTimeout(() => {
        copyFiles(pathArrayReactZustandFrom, pathArrayReactZustandTo, from, to)
        reactHooks(answers, from, to + '/menuWithZustand/src/App.tsx')
        console.log(chalk.green(`    react frontend with menu and zustand completed!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
    }, 2000)

}

export default menuZustand