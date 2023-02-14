import copyFiles from "./copyFiles.js";
import * as sweet from "./sweet.js";

function reactFrontendNext(answers, from, to) {

    const pathArrayReactNextTo = [`${answers.name}-frontend`, 'frontend', 'frontend/src', 'frontend/src/app', 'frontend/src/app/about', 'frontend/src/app/info', 'frontend/src/components', 'frontend/src/pages', 'frontend/src/styles', 'frontend/public', 'frontend/public/images']
    const pathArrayReactNextFrom = ['templates/nextjs_usecontext', 'templates/nextjs_usecontext/src', 'templates/nextjs_usecontext/src/app', 'templates/nextjs_usecontext/src/components', 'templates/nextjs_usecontext/src/pages', 'templates/nextjs_usecontext/src/styles', 'templates/nextjs_usecontext/src/app/about', 'templates/nextjs_usecontext/src/app/info', 'templates/nextjs_usecontext/public', 'templates/nextjs_usecontext/public/images']

    copyFiles(pathArrayReactNextFrom, pathArrayReactNextTo, from, to)
    sweet.npmInstaller(`${to}/${pathArrayReactNextTo[0]}`)
    sweet.gitInit(`${to}/${pathArrayReactNextTo[0]}`)
}


export default reactFrontendNext