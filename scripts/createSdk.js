
const fs = require('fs');
const fse = require('fs-extra');
const { resolve } = require('path');

const CWD = process.cwd();

const defaultLibName = 'dist';
const defaultAutoLoaderName = 'auto-loader.js';

const readFileContent = (filepath, base = __dirname) => {
    return fs.readFileSync(resolve(base, filepath)).toString();
};

const readDirsBaseOnDir = (dirpath) => {
    return fs.readdirSync(resolve(__dirname, dirpath));
};

const getScriptFiles = (pathArray) => {
    return pathArray.filter((each) => /\.js$/.test(each));
};

const generateConfig = (scriptFiles, root = defaultLibName) => {
    let first;
    let second;
    let third;

    for (const index in scriptFiles) {
        if (/^mainfest\./.test(scriptFiles[index])) {
            first = scriptFiles.splice(index, 1, -1)[0];
        }

        if (/^main\./.test(scriptFiles[index])) {
            second = scriptFiles.splice(index, 1, -1)[0];
        }

        if (/^common\./.test(scriptFiles[index])) {
            third = scriptFiles.splice(index, 1, -1)[0];
        }
    }

    return [first, second, third]
        .concat(scriptFiles.filter((each) => each != -1))
        .map((each) => `${defaultLibName}/${each}`);
};

const writeTheSdkFile = (target, sdkContent) => {
    fs.writeFileSync(resolve(target, defaultLibName, defaultAutoLoaderName), sdkContent);
};

const copyLibsToDest = (localLibraries, dest) => {
    fse.copySync(resolve(__dirname, '..', defaultLibName), resolve(CWD, defaultLibName));
};

module.exports = (path) => {
    const target = resolve(CWD, path);
    const scriptData = readFileContent('./mountSdkTemplate');
    const allFiles = readDirsBaseOnDir(`../${defaultLibName}`);
    const scriptFiles = getScriptFiles(allFiles);
    const config = generateConfig(scriptFiles);
    const mountSdkString = scriptData.replace('<config>', JSON.stringify(config));

    if (!fs.existsSync(resolve(target, defaultLibName))) {
        fs.mkdirSync(resolve(target, defaultLibName))
    }

    if (fs.existsSync(resolve(CWD, defaultLibName))) {
        fse.removeSync(resolve(CWD, defaultLibName));
    }

    copyLibsToDest();
    writeTheSdkFile(target, mountSdkString);

    console.log(`
        You can copy the script - <script src="./${defaultLibName}/${defaultAutoLoaderName}"></script> into your entry file
    `);
}
