import {copyFile} from "fs/promises";
import chalk from "chalk";
import {join} from "path";

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



export default copyAll;