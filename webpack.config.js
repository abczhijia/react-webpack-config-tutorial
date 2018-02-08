const path = require('path');
const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

const config = {
    entry: {
        main: path.resolve(__dirname, 'src', 'main.js'),
        vendor: ['lodash', 'react']
    },
    output: {
        filename: '[name]-[hash].js',

        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
        new ExtractTextWebpackPlugin('[name]-[chunkhash].css'),
        new HtmlWebpackPlugin({
            title: 'react webpack config tutorial'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        }),
        new CleanWebpackPlugin(['dist'])
    ]
}

module.exports = config;