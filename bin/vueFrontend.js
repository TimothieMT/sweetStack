import chalk from "chalk";
import copyFiles from "./copyFiles.js";

const pathArrayVueTo = ['frontend', 'frontend/src','frontend/public', 'frontend/src/assets', 'frontend/src/components', 'frontend/src/components/icons', 'frontend/src/router', 'frontend/src/views']
const pathArrayVueFrom = ['templates/vue-frontend', 'templates/vue-frontend/src','templates/vue-frontend/public', 'templates/vue-frontend/src/assets', 'templates/vue-frontend/src/components', 'templates/vue-frontend/src/components/icons', 'templates/vue-frontend/src/router', 'templates/vue-frontend/src/views']


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