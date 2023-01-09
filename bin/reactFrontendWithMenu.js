import fs from "fs";
import chalk from "chalk";
import {copyFile} from "fs/promises";
import {join} from "path";

function reactFrontendWithMenu(from, to, answers) {
    //CREATE REACT FRONTEND

    async function copyAFile(from, to) {
        try {
            await copyFile(from, to);
        } catch (err) {
            console.log(chalk.red(`no such file or directory, copyfile '${from}' -> '${to}'`));
        }
    }

    async function copyAll(fromDir, toDir, filePaths) {
        return Promise.all(filePaths.map(filePath => {
            return copyAFile(join(fromDir, filePath), join(toDir, filePath));
        }));
    }

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

        const useEffectAxios = fs.readFileSync(from + '/templates/react-hooks/useEffectAxiosTemplate.txt', 'utf8')
        const useReducer = fs.readFileSync(from + '/templates/react-hooks/useReducerTemplate.txt', 'utf8')
        const useState = fs.readFileSync(from + '/templates/react-hooks/useStateTemplate.txt', 'utf8')
        const useRef = fs.readFileSync(from + '/templates/react-hooks/useRefTemplate.txt', 'utf8')
        const useContext = fs.readFileSync(from + '/templates/react-hooks/useContextTemplate.txt', 'utf8')
        const answerArray = []

        answers['hooks'].forEach((hook) => {
            if (answers['hooks'].includes(hook)) {

                if (hook === 'useEffect/Axios')
                    answerArray.push(useEffectAxios)
            }
            if (hook === 'useState') {
                answerArray.push(useState)
            }
            if (hook === 'useReducer') {
                answerArray.push(useReducer)
            }
            if (hook === 'useContext') {
                answerArray.push(useContext)
            }
            if (hook === 'useRef') {
                answerArray.push(useRef)
            }
            console.log(`${hook} successfully`)
        })
        answerArray.map(value => fs.writeFileSync(`${to}/frontendWithMenu/src/App.tsx`, value, {flag: 'a+'}))

    })

    console.log(chalk.green(`react frontend with menu successfully!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
}

export default reactFrontendWithMenu