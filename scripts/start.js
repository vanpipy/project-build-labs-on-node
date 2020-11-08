#!/usr/bin/env node

const { resolve } = require('path');
const webpack = require('webpack');
const { Command } = require('commander');

const program = new Command();
const runWebpack = require('./runWebpack');

const DEV = 'dev';
const PROD = 'prod';

program
    .version('0.1.0')
    .option('-m --mode <mode>', 'set the mode to execute the webpack');

program.on('option:mode', () => {
    if (program.mode === DEV) {
        runWebpack.watch(DEV);
    }

    if (program.mode === PROD) {
        runWebpack.pack(PROD);
    }
});

program.parse(process.argv);

if (!program.mode) {
    runWebpack.watch(DEV);
}
