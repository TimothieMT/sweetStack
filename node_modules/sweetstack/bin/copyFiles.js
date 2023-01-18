import * as path from "path";
import fse from "fs-extra";


function copyFiles(arrFrom, arrTo, from, to) {

    const srcDir = path.join(from, arrFrom[0]);
    const destDir = path.join(to, arrTo[0]);

    fse.copySync(srcDir, destDir, {overwrite: true | false})
}

export default copyFiles;