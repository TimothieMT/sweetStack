import fs from "fs";
import chalk from "chalk";
import reactHooks from "./reactHooks.js";


const pathArrayTo = ['frontendWithMenu', 'frontendWithMenu/src', 'frontendWithMenu/src/assets', 'frontendWithMenu/src/pages', 'frontendWithMenu/public', 'frontendWithMenu/cli']
const pathArrayFrom = ['templates/react-frontend-routes', 'templates/react-frontend-routes/src', 'templates/react-frontend-routes/src/assets', 'templates/react-frontend-routes/public', 'templates/react-frontend-routes/cli']


function create(from, to) {
    fs.mkdirSync(to)
    pathArrayTo.map((path) => {
        fs.mkdirSync(`${to}/${path}`)
    })

   return  pathArrayFrom.map((path, index) => {
        fs.readdirSync(`${from}/${path}`).forEach((file) => {
            fs.cp(`${from}/${path}/${file}`, `${to}/${pathArrayTo[index]}/${file}`, {recursive: true}, (err) => {
                if (err) throw err;
            })
        })
    })
}


function reactFrontendWithMenu(answers, from, to) {
    //CREATE REACT FRONTEND WITH MENU


    try {

        create(from, to)


        console.log(chalk.green(`react frontend with menu successfully!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
    } catch (err) {
        console.log(chalk.red(`react frontend with menu failed! ${err}`))
    }
}

export default reactFrontendWithMenu;