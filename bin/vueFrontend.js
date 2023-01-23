import chalk from "chalk";
import copyFiles from "./copyFiles.js";

const pathArrayVueTo = ['frontend', 'frontend/src','frontend/public', 'frontend/src/assets', 'frontend/src/components', 'frontend/src/components/icons', 'frontend/src/router', 'frontend/src/views']
const pathArrayVueFrom = ['templates/vue_frontend', 'templates/vue_frontend/src','templates/vue_frontend/public', 'templates/vue_frontend/src/assets', 'templates/vue_frontend/src/components', 'templates/vue_frontend/src/components/icons', 'templates/vue_frontend/src/router', 'templates/vue_frontend/src/views']


function vueFrontend(from, to, answers) {

    setTimeout(() => {
        copyFiles(pathArrayVueFrom, pathArrayVueTo, from, to)
        console.log(chalk.green(`vue frontend completed!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
    }, 2000)

}

export default vueFrontend;