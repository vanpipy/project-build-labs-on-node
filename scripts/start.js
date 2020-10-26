'use strict';

const { resolve } = require('path');
const webpack = require('webpack');
const yargs = require('yargs/yargs');
const argv = yargs(process.argv.slice(2)).parse();
const mode = argv.runner || 'dev';
const config = require(resolve(__dirname, `../configs/webpack.${mode}.config.js`));
const runner = {
    dev: 'run',
    prod: 'run',
    test: 'watch'
};

const compiler = webpack(config);

class Compiler {
    constructor(props) {
        this.compiler = props.compiler;
    }

    run(args) {

    }
}
