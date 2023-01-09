import fs from "fs";
import chalk from "chalk";
import copyAll from "./copyFunction.js";

function vueFrontend(from, to, answers) {
    //CREATE VUE FRONTEND

    fs.mkdirSync(to)
    fs.mkdirSync(to + "/frontend")
    fs.mkdirSync(to + "/frontend/src")
    fs.mkdirSync(to + "/frontend/public")
    fs.mkdirSync(to + "/frontend/src/assets")
    fs.mkdirSync(to + "/frontend/src/components")
    fs.mkdirSync(to + "/frontend/src/components/icons")
    fs.mkdirSync(to + "/frontend/src/router")
    fs.mkdirSync(to + "/frontend/src/views")

    copyAll(
        `${from}/templates/vue-frontend`,
        `${to}/frontend`,
        ['env.d.ts', 'index.html', 'package.json', 'package-lock.json', 'README.md', 'tsconfig.config.json', 'tsconfig.json', 'vite.config.ts'],
    ).then(r => r);
    copyAll(
        `${from}/templates/vue-frontend/src`,
        `${to}/frontend/src`,
        ['App.vue', 'main.ts'],
    ).then(r => r);
    copyAll(
        `${from}/templates/vue-frontend/src/assets`,
        `${to}/frontend/src/assets`,
        ['base.css', 'logo.svg', 'main.css'],
    ).then(r => r);
    copyAll(
        `${from}/templates/vue-frontend/src/components`,
        `${to}/frontend/src/components`,
        ['HelloWorld.vue', 'TheWelcome.vue', 'WelcomeItem.vue'],
    ).then(r => r);
    copyAll(
        `${from}/templates/vue-frontend/src/components/icons`,
        `${to}/frontend/src/components/icons`,
        ['IconCommunity.vue', 'IconDocumentation.vue', 'IconEcosystem.vue', 'IconSupport.vue', 'IconTooling.vue'],
    ).then(r => r);
    copyAll(
        `${from}/templates/vue-frontend/src/router`,
        `${to}/frontend/src/router`,
        ['index.ts'],
    ).then(r => r);
    copyAll(
        `${from}/templates/vue-frontend/src/views`,
        `${to}/frontend/src/views`,
        ['AboutView.vue', 'HomeView.vue'],
    ).then(r => r);

    console.log(chalk.green(`vue backend successfully!
            
            cd ${answers.name}
            cd frontend
            npm install
            npm run dev`))
}

export default vueFrontend;