import {exec} from 'child_process';
import fs from "fs";
import _progress from "cli-progress";
import chalk from "chalk";

/**
 * getNpmRoot
 *
 * returns the directory of where node_modules is stored on Linux, Mac and Windows
 *
 * const npmRoot = await sweet.getNpmRoot();
 */
export const getNpmRoot = () => {
    return new Promise((resolve) => {
        exec('npm root -g', (error, stdout, stderr) => {
            stdout = stdout.trim('\n');
            const lines = stdout.split('\n');
            if (lines.length > 1) {
                stdout = lines[lines.length - 1];
            }
            resolve(stdout);
        });
    });
};

/*
    * makeHook with write option
 */

export const makeHook = (content, to) => {
    fs.writeFileSync(to, content, {flag: 'w', encoding: 'utf8'});
}

/*
    * renameFile with async/await
 */

export const renameFileSync = (oldName, newName) => {
    try {
        fs.renameSync(oldName, newName)
    } catch (err) {
        console.error(err)
    }
}

/*
    * npm install automatic execution
 */

export const npmInstaller =  (path) => {
    return new Promise((resolve) => {
        exec(`cd ${path} && npm install`, (error, stdout, stderr) => {
            resolve(stdout);
        });
    });
}

export const loader = (onComplete, timerValue) => {
    // create new progress bar using default values
    const b1 = new _progress.Bar();
    b1.start(100, 0);

    // the bar value - will be linear incremented
    let value = 0;

    // 20ms update rate
    const timer = setInterval(function(){
        // increment value
        value++;

        // update the bar value
        b1.update(value)

        // set limit
        if (value >= b1.getTotal()){
            // stop timer
            clearInterval(timer);

            b1.stop();

            // print message
            console.log(chalk.green(`
            go to folder and npm run dev`))
        }
    }, timerValue);
}

