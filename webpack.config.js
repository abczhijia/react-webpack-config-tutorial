const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: path.resolve(__dirname, 'src', 'main.js'),
    output: {
        filename: 'bundle.js',
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
        new ExtractTextWebpackPlugin('app.css')
    ]
}

module.exports = config;