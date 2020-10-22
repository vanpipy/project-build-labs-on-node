'use strict';

const dotenv = require('dotenv');
const { merge } = require('webpack-merge');
const { resolve } = require('path');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');

const baseConfig = require('./webpack.base.config');

dotenv.config({ path: resolve(__dirname, '../.env.local') });

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'eval-cheap-source-map' ,
    plugins: baseConfig.plugins.concat([
        new Serve({
            host: process.env.HOST,
            port: Number(process.env.PORT),
            hmr: true,
            open: true,
            static: resolve(__dirname, '../dist')
        })
    ]),
    watch: true
});
