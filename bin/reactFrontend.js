import fs from "fs";
import chalk from "chalk";
import copyAll from "./copyFunction.js";
import reactHooks from "./reactHooks.js";

function reactFrontend(answers, from, to) {
    //CREATE REACT FRONTEND


    fs.mkdirSync(to)
    fs.mkdirSync(to + "/frontend")
    fs.mkdirSync(to + "/frontend/src")
    fs.mkdirSync(to + "/frontend/public")

    copyAll(
        `${from}/templates/react-frontend`,
        `${to}/frontend`,
        ['package.json', 'index.html', 'package-lock.json', 'tsconfig.json', 'tsconfig.node.json', 'vite.config.ts'],
    ).then(r => r);

    copyAll(
        `${from}/templates/react-frontend/src`,
        `${to}/frontend/src`,
        ['App.scss', 'App.tsx', 'index.css', 'main.tsx', 'vite-env.d.ts'],
    ).then(() => {
        reactHooks(answers, from, to)
    })

    console.log(chalk.green(`react frontend successfully!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
}

export default reactFrontend