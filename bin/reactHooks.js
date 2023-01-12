
import fs from "fs";
import chalk from "chalk";

function reactHooks(answers, from, to) {

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
        console.log(chalk.green(`
    ${hook} added to template!`))
    })
    answerArray.forEach(value => fs.writeFileSync(`${to}`, value, {flag: 'a+'}))
}

export default reactHooks;