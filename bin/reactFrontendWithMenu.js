import fs from "fs";
import chalk from "chalk";
import copyAll from "./copyFunction.js";
import reactHooks from "./reactHooks.js";


function reactFrontendWithMenu(answers, from, to) {
    //CREATE REACT FRONTEND


    fs.mkdirSync(to)
    fs.mkdirSync(to + "/frontendWithMenu")
    fs.mkdirSync(to + "/frontendWithMenu/src")
    fs.mkdirSync(to + "/frontendWithMenu/src/assets")
    fs.mkdirSync(to + "/frontendWithMenu/src/pages")
    fs.mkdirSync(to + "/frontendWithMenu/public")
    fs.mkdirSync(to + "/frontendWithMenu/cli")

    copyAll(
        `${from}/templates/react-frontend-routes`,
        `${to}/frontendWithMenu`,
        ['package.json', 'index.html', 'package-lock.json', 'tsconfig.json', 'tsconfig.node.json', 'vite.config.ts'],
    ).then(r => r);

    copyAll(
        `${from}/templates/react-frontend-routes/public`,
        `${to}/frontendWithMenu/public`,
        ['vite.svg'],
    ).then(r => r);

    copyAll(
        `${from}/templates/react-frontend-routes/cli`,
        `${to}/frontendWithMenu/cli`,
        ['cp.mjs'],
    ).then(r => r);
    copyAll(
        `${from}/templates/react-frontend-routes/src/pages`,
        `${to}/frontendWithMenu/src/pages`,
        ['PageAbout.tsx', 'PageInfo.tsx', 'PageWelcome.tsx'],
    ).then(r => r);

    copyAll(
        `${from}/templates/react-frontend-routes/src/assets`,
        `${to}/frontendWithMenu/src/assets`,
        ['react.svg'],
    ).then(r => r);
    copyAll(
        `${from}/templates/react-frontend-routes/src`,
        `${to}/frontendWithMenu/src`,
        ['App.scss', 'App.tsx', 'main.tsx', 'vite-env.d.ts'],
    ).then(() => {
        reactHooks(answers, from, to)
    })

    console.log(chalk.green(`react frontend with menu successfully!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
}

export default reactFrontendWithMenu