'use strict';

const fs = require('fs');
const { resolve } = require('path');

const { copyFileSync } = fs;
const { COPYFILE_EXCL } = fs.constants;
const NODEMODULEDIR = resolve(__dirname, '../node_modules');
const vendor = resolve(__dirname, '..', 'public/vendor');

function init() {
    copyMocha();
    copyChai();
}

function copyMocha() {
    const MOCHAJS = 'mocha/mocha.js';
    const MOCHACSS = 'mocha/mocha.css';

    fs.copyFileSync(
        resolve(__dirname, NODEMODULEDIR, MOCHAJS),
        resolve(vendor, 'mocha.js')
    );
    fs.copyFileSync(
        resolve(__dirname, NODEMODULEDIR, MOCHACSS),
        resolve(vendor, 'mocha.css')
    );
}

function copyChai() {
    const CHAIJS = 'chai/chai.js';

    fs.copyFileSync(
        resolve(__dirname, NODEMODULEDIR, CHAIJS),
        resolve(vendor, 'chai.js')
    );
}

init();
