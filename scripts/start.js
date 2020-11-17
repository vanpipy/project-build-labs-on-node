#!/usr/bin/env node

const { resolve } = require('path');
const webpack = require('webpack');
const { Command } = require('commander');

const program = new Command();
const runWebpack = require('./runWebpack');
const createSdk = require('./createSdk');

const DEV = 'dev';
const PROD = 'prod';

program.version('0.1.0');

program
    .option('-m --mode <mode>', 'set the mode to execute the webpack');

program
    .option('--create-sdk [dir]', 'create the software development kit', '.');

program.on('option:mode', () => {
    if (program.mode === DEV) {
        runWebpack.watch(DEV);
    }

    if (program.mode === PROD) {
        runWebpack.pack(PROD);
    }
});

program.on('option:create-sdk', () => {
    createSdk(program.createSdk);
});

program.parse(process.argv);
