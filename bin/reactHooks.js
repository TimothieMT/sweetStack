import fs from "fs";
import chalk from "chalk";


function reactHooks(answers, from, to) {

    const useEffectAxios = fs.readFileSync(from + '/templates/react_hooks/useEffectAxiosTemplate.txt', 'utf8')
    const useReducer = fs.readFileSync(from + '/templates/react_hooks/useReducerTemplate.txt', 'utf8')
    const useState = fs.readFileSync(from + '/templates/react_hooks/useStateTemplate.txt', 'utf8')
    const useRef = fs.readFileSync(from + '/templates/react_hooks/useRefTemplate.txt', 'utf8')
    const useContext = fs.readFileSync(from + '/templates/react_hooks/useContextTemplate.txt', 'utf8')

    const content = fs.readFileSync('templates/react_frontend/src/App.tsx', 'utf8');

    answers['hooks'].forEach((hook) => {

        if (hook === 'useEffect/Axios') {
            const newContent = content.replace('//@hook', useEffectAxios);
            fs.writeFileSync(to, newContent, () => {
                if (newContent.includes('//@hook'))
                    content.replace('//@hook', '');
            });
        }

        if (hook === 'useState') {
            const newContent = content.replace('//@hook', useState);
            fs.writeFileSync(to, newContent, () => {
                if (newContent.includes('//@hook'))
                    content.replace('//@hook', '');
            });
        }
        // if (hook === 'useReducer') {
        //     answerArray.push(useReducer)
        // }
        // if (hook === 'useContext') {
        //     answerArray.push(useContext)
        // }
        // if (hook === 'useRef') {
        //     answerArray.push(useRef)
        // }
        console.log(chalk.green(`${hook} added to template!`))
    })
}

export default reactHooks;