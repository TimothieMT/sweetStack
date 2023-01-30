import copyFiles from "./copyFiles.js";
import * as sweet from "./sweet.js";


function reactPinAuthentication(answers, from, to) {

    const pathArrayReactPinTo = [`${answers.name}-frontend`, 'frontend', 'frontend/src', 'frontend/src/assets',
        'frontend/src/components', 'frontend/src/styles', 'frontend/src/pages', 'frontend/public', 'frontend/cli',
    ]
    const pathArrayReactPinFrom = ['templates/react_CRUDLowdb_pinAuthentication', 'templates/react_CRUDLowdb_pinAuthentication/dev', 'templates/react_CRUDLowdb_pinAuthentication/src', 'templates/react_CRUDLowdb_pinAuthentication/frontend/src/assets', 'templates/react_CRUDLowdb_pinAuthentication/public', 'templates/react_CRUDLowdb_pinAuthentication/cli'
    ]


    copyFiles(pathArrayReactPinFrom, pathArrayReactPinTo, from, to)
    sweet.renameFileSync(`${to}/${pathArrayReactPinTo[0]}/gitignore`, `${to}/${pathArrayReactPinTo[0]}/.gitignore`)
    sweet.renameFileSync(`${to}/${pathArrayReactPinTo[0]}/prettierrc`, `${to}/${pathArrayReactPinTo[0]}/.prettierrc`)
    sweet.npmInstaller(`${to}/${pathArrayReactPinTo[0]}`)
}


export default reactPinAuthentication