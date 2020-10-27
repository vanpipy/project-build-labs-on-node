'use strict';

const { readFileSync } = require('fs');
const dotenv = require('dotenv');
const { merge } = require('webpack-merge');
const { resolve } = require('path');
const { WebpackPluginServe: Serve } = require('webpack-plugin-serve');

const baseConfig = require('./webpack.base.config');
const mocker = require('../mock');

dotenv.config({ path: resolve(__dirname, '../.env.local') });

const isVueScriptFiles = info => info.resourcePath.match(/\.vue$/) && !info.resource.match(/type=script/);

module.exports = merge(baseConfig, {
    mode: 'development',
    entry: {
        main: [
            'webpack-plugin-serve/client'
        ]
    },
    output: {
        devtoolModuleFilenameTemplate: info => {
            let $filename = 'sources://' + info.resourcePath;
            if (isVueScriptFiles(info)) {
                $filename = 'webpack-generated:///' + info.resourcePath + '?' + info.hash;
            }
            return $filename;
        }
    },
    devtool: 'eval-source-map' ,
    plugins: [
        new Serve(Object.assign({
            host: process.env.HOST,
            port: Number(process.env.PORT),
            hmr: true,
            open: true,
            static: resolve(__dirname, '../dist'),
            middleware: (app, builtins) => {
                app.use(mocker.routes());
                app.use(builtins.proxy('/google', {
                    target: 'https://google.com'
                }));
            }
        }, process.env.ENABLE_HTTPS == 1 && {
            https: {
                key: readFileSync('test/fixtures/keys/agent-key.pem'),
                cert: readFileSync('test/fixtures/keys/agent-cert.pem')
            }
        }))
    ],
    watch: true
});
