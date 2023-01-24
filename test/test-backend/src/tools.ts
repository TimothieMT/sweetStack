import path from 'path';
import os from 'os';
import * as tools from './tools.js';

const __dirname = path.resolve(path.dirname(''));

export const absolutifyPathAndFileName = (pathAndFileName: string) => {
    if (tools.operatingSystemIsWindows()) {
        return __dirname + '\\' + pathAndFileName.replace(/\//g, '\\');
    } else {
        return __dirname + '/' + pathAndFileName;
    }
};

export const operatingSystemIsWindows = () => {
    return os.platform() === 'win32';
};