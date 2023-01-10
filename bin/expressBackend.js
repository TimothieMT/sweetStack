import fs from "fs";
import chalk from "chalk";
import copyAll from "./copyFunction.js";


function expressBackend(answers, from, to) {

    fs.mkdirSync(to + "/backend")
    fs.mkdirSync(to + "/backend/dist")
    fs.mkdirSync(to + "/backend/src")

    copyAll(
        `${from}/templates/express-backend`,
        `${to}/backend`,
        ["nodemon.json", "package.json", "package-lock.json", "tsconfig.json"],
    ).then(r => r);
    copyAll(
        `${from}/templates/express-backend/dist`,
        `${to}/backend/dist`,
        ["server.js", "server.js.map"],
    ).then(r => r);
    copyAll(
        `${from}/templates/express-backend/src`,
        `${to}/backend/src`,
        ["server.ts"],
    ).then(r => r);
    console.log(chalk.green(`react backend successfully!
            
            cd ${answers.name}
            cd backend
            npm install
            npm run start`))
}

export default expressBackend;