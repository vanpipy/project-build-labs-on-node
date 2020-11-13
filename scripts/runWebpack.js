
const { resolve } = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const bytes = require('bytes');

/*
 * TODO: Please refer to [webpack stats object](https://webpack.js.org/api/stats/#chunk-objects)
 */
const outputChunkInfo = ({
    title,
    resource
}) => {
    for (let each in resource) {
        each = resource[each];

        const mainSegment = chalk`{bold ${title}} ${each.id} hash:${each.hash}`;
        const sizeSegment = chalk`${each.id} {bold ${bytes(each.size)}}`;
        const statusSegment = `${each.entry ? '[entry]' : ''} ${each.initial ? '[initial]' : ''} ${each.rendered ? '[rendered]' : ''}`;

        console.log(`${mainSegment} ${sizeSegment} ${statusSegment}`);
    }
};

const progressPlugin = new webpack.ProgressPlugin((percentage, msg, ...args) => {
    process.stdout.write(`${Math.ceil(percentage * 100)}% ${msg} ${args} \r`);
});

const pack = (mode) => {
    const config = require(resolve(__dirname, `../configs/webpack.${mode}.config.js`));
    const compiler = webpack(config);

    progressPlugin.apply(compiler);

    compiler.run((err, stats) => {
        if (err || stats.hasErrors()) {
            throw err;
        }
    });
};

const watch = (mode) => {
    const config = require(resolve(__dirname, `../configs/webpack.${mode}.config.js`));
    const compiler = webpack(config);

    progressPlugin.apply(compiler);

    compiler.watch({

    }, (err, stats) => {
        if (err || stats.hasErrors()) {
            throw err;
        }

        const statsJson = stats.toJson();

        console.log('\n');
        outputChunkInfo({
            title: 'chunk',
            resource: statsJson.chunks
        });
    });
};

module.exports = {
    pack,
    watch
}
