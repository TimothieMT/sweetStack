import fs from "fs";
import chalk from "chalk";
import {copyFile} from "fs/promises";
import {join} from "path";

function reactFrontend(from, to, answers) {
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
        answerArray.map(value => fs.writeFileSync(`${to}/frontend/src/App.tsx`, value, {flag: 'a+'}))

    })

    console.log(chalk.green(`react frontend successfully!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
}

export default reactFrontend