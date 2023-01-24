import {exec} from 'child_process';
import fs from "fs";

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

export const makeHook = (content, to) => {
    fs.writeFileSync(to, content, {flag: 'w', encoding: 'utf8'});
}
