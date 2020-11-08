
const { resolve } = require('path');
const webpack = require('webpack');

const outputResource = (resource) => {
    // TODO: output the resource which has the format as wish.
};

const pack = (mode) => {
    const config = require(resolve(__dirname, `../configs/webpack.${mode}.config.js`));
    const compiler = webpack(config);

    compiler.run((err, stats) => {
        if (err || stats.hasErrors()) {
            throw err;
        }
    });
};

const watch = (mode) => {
    const config = require(resolve(__dirname, `../configs/webpack.${mode}.config.js`));
    const compiler = webpack(config);

    compiler.watch({

    }, (err, stats) => {
        if (err || stats.hasErrors()) {
            throw err;
        }

        const statsJson = stats.toJson();

        outputResource(statsJson.assetsByChunkName);
        outputResource(statsJson.assets);
        outputResource(statsJson.chunks);
        outputResource(statsJson.modules);
    });
};

module.exports = {
    pack,
    watch
}
