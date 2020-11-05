'use strict';

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: [
            path.resolve(__dirname, '../src/main.ts')
        ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {

                        }
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/]
                        },
                    }
                ],
            },
            {
                test: /\.(css|less)$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10,
                            esModule: false,
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    esModule: false,
                                    name: 'assets/[name].[hash].[ext]'
                                }
                            }
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.json', '.vue', '.css', '.less'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            vuex$: 'vuex/dist/vuex.esm.js',
            '@': path.resolve(__dirname, '../src')
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            inject: true
        })
    ],
    optimization: {
        runtimeChunk: {
            name: 'mainfest'
        },
        splitChunks: {
            cacheGroups: {
                common: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'common',
                    chunks: 'all',
                    enforce: true,
                    priority: 2
                },
                default: false
            }
        }
    }
}
