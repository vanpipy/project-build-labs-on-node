
const fs = require('fs');
const fse = require('fs-extra');
const { resolve } = require('path');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const CWD = process.cwd();

const defaultLibName = 'dist';
const defaultLibIndex = 'index.html';

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

module.exports = (target) => {
    const scriptData = readFileContent('./mountSdkTemplate');
    const allFiles = readDirsBaseOnDir(`../${defaultLibName}`);
    const scriptFiles = getScriptFiles(allFiles);
    const config = generateConfig(scriptFiles);
    const mountSdkString = scriptData.replace('<config>', JSON.stringify(config));
    const targetFile = resolve(CWD, target, defaultLibIndex);
    const targetFileData = readFileContent(targetFile, CWD);

    const { window } = new JSDOM(targetFileData);
    const { document } = window;

    let autoLoaderDom = document.querySelector('#autoloader');

    if (autoLoaderDom) {
        document.body.removeChild(autoLoaderDom);
    }

    autoLoaderDom = document.createElement('script');
    autoLoaderDom.id = 'autoloader';
    autoLoaderDom.type = 'text/javascript';
    autoLoaderDom.innerHTML = mountSdkString;

    document.body.appendChild(autoLoaderDom);

    fs.writeFileSync(targetFile, `<!DOCTYPE html>\n${document.documentElement.outerHTML}`);

    if (!fs.existsSync(resolve(CWD, defaultLibName))) {
        fs.mkdirSync(resolve(CWD, defaultLibName))
    }

    fse.copySync(resolve(__dirname, '..', defaultLibName), resolve(CWD, defaultLibName));
}
