/* eslint-disable */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = config => {
  const underDev = process.env.NODE_ENV === 'development';
  config.devtool = underDev ? 'source-map' : 'cheap-module-source-map';
  config.module.rules[0].oneOf[0] = {
    test: /\.s[ac]ss$/i,
    use: [
      underDev ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
      require.resolve('css-loader'),
      require.resolve('postcss-loader'),
      require.resolve('sass-loader'),
    ],
  };
  config.resolve = {
    ...config.resolve,
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  };
  return config;
};
