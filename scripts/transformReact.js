const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV === 'development';

const scanComponent = () => {
  const root = path.resolve(__dirname, '../src/modules');
  const components = fs.readdirSync(root);
  const mapping = components
    .filter((each) => !/\.ts$/.test(each))
    .reduce((result, component) => {
      const key = component;
      result[key.toLowerCase()] = path.join(root, component, 'componentEntry');
      return result;
    }, {});
  return mapping;
};

const createWebpackConfig = (entry) => {
  return Object.assign({
    entry: {
      ...entry,
      style: ['rsuite/dist/rsuite.min.css']
    },
    output: {
      publicPath: '.',
      path: path.resolve(__dirname, '../public'),
      filename: isDev ? '[name].js' : '[name].[fullhash].js',
      library: ['__PKG', '[name]'],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader'
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
          use: 'file-loader'
        }
      ],
    },
    plugins: [
      new WebpackManifestPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      })
    ],
    optimization: {
      chunkIds: 'named',
      usedExports: true,
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'commons',
            chunks: 'initial',
            minChunks: 2,
          },
          react: {
            test: /[\\/]node_modules[\\/](react)[\\/]/,
            name: 'react',
            chunks: 'all',
            priority: 99
          },
          'react-dom': {
            test: /[\\/]node_modules[\\/](react-dom)[\\/]/,
            name: 'react-dom',
            chunks: 'all',
            priority: 99
          },
          'ui': {
            type: 'javascript',
            test: /[\\/]node_modules[\\/](rsuite)[\\/]/,
            name: 'ui',
            chunks: 'all',
            priority: 99
          }
        }
      }
    }
  }, isDev ? {
    mode: 'development',
    devtool: 'inline-source-map',
    watch: true,
    watchOptions: {
      ignored: /node_modules/
    }
  } : {
    mode: 'production'
  });
};

const entry = scanComponent()
const webpackConfig = createWebpackConfig(entry);

webpack(webpackConfig, (err, stats) => {
  if (err) {
    console.log('============ ERROR ============');
    console.error(err);
    console.log('============ ERROR ============');
    return;
  }

  console.log(stats.toString({
    chunks: false,
    colors: true
  }));
});
