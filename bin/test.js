import fs from "fs";
import path from "path";


const useState = fs.readFileSync(`${path.resolve()}` + '/templates/react_hooks/useStateTemplate.txt', 'utf8')

const content = fs.readFileSync('templates/react_frontend/src/App.tsx', 'utf8');
const newContent = content.replace('//@hook', useState);
fs.writeFileSync('templates/react_frontend/src/App.tsx', newContent, () => {
    if (newContent.includes('//@hook'))
        content.replace('//@hook', '');
});



