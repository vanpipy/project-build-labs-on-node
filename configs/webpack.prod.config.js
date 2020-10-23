'use strict';

const dotenv = require('dotenv');
const { merge } = require('webpack-merge');
const { resolve } = require('path');
const { existsSync } = require('fs');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');

const baseConfig = require('./webpack.base.config');

const LOCALENVFILE = resolve(__dirname, '../.env.local');

let envFilePath = resolve(__dirname, '../.env');

if (!existsSync(envFilePath)) {
    envFilePath = LOCALENVFILE;
}

dotenv.config({ path: envFilePath });

module.exports = merge(baseConfig, {
    mode: 'production'
});
