import fs from "fs";
import chalk from "chalk";
import * as sweet from './sweet.js';

function reactHooks(answers, from, to) {

    const useEffectAxios = fs.readFileSync(from + '/templates/react_hooks/useEffectAxiosTemplate.txt', 'utf8')
    const useReducer = fs.readFileSync(from + '/templates/react_hooks/useReducerTemplate.txt', 'utf8')
    const useRef = fs.readFileSync(from + '/templates/react_hooks/useRefTemplate.txt', 'utf8')
    const useContext = fs.readFileSync(from + '/templates/react_hooks/useContextTemplate.txt', 'utf8')
    const noHooks = fs.readFileSync(from + '/templates/react_hooks/noHookTemplate.txt', 'utf8')


    if (answers['framework'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'simple page' && answers['hooks'] === 'useEffect/Axios') {
        sweet.makeHook(useEffectAxios, to);
    }
    if (answers['framework'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'simple page' && answers['hooks'] === 'useReducer') {
        sweet.makeHook(useReducer, to);
    }
    if (answers['framework'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'simple page'&& answers['hooks'] === 'useContext') {
        sweet.makeHook(useContext, to);
    }
    if (answers['framework'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'simple page'&& answers['hooks'] === 'useRef') {
        sweet.makeHook(useRef, to);
    }
    if (answers['framework'] === chalk.hex('#A7C7E7')('react') && answers['menu'] === 'simple page'&& answers['hooks'] === 'noHook') {
        sweet.makeHook(noHooks, to);
    }

}

export default reactHooks;