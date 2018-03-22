const path = require('path');
const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
    entry: {
        main: path.resolve(__dirname, 'src', 'main.js'),
        vendor: ['lodash', 'react'],
    },
    output: {
        filename: '[name]-[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                minimize: true,
                                localIdentName: '[local]_[hash:base64:5]', //这里的localIdentName必须和babel-loader里面的generateScopedName配置保持一致
                            },
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                }),
            },
            {
                test: /\.jsx?$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['react', 'env'],
                            plugins: [
                                [
                                    'babel-plugin-react-css-modules',
                                    {
                                        filetypes: {
                                            '.scss': {
                                                'syntax': 'postcss-scss',
                                            },
                                        },
                                        generateScopedName: '[local]_[hash:base64:5]',
                                    },
                                ],
                            ],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new ExtractTextWebpackPlugin('[name]-[chunkhash].css'),
        new HtmlWebpackPlugin({
            title: 'react webpack config tutorial',
            template: path.resolve(__dirname, 'src', 'index.html'),
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor'],
        }),
        new CleanWebpackPlugin(['dist']),
    ],
};

module.exports = config;