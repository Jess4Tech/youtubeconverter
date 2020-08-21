const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    target: 'electron-main',
    mode:'development',
    entry: {
        index: './src/JS/ui/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: '[name].[contentHash].js'
    },
    devtool: 'inline-source-map',
    devServer: {
        port: 5000,
        contentBase: path.resolve(__dirname, 'public'),
        watchContentBase: true
    },
    node: {
        __dirname: false,
        __filename: false
    },
    module: {
        rules: [
            {test: /\.m?js$/, use:'babel-loader'},
            {test: /\.css$/, use:['style-loader', 'css-loader']},
            {test: /\.png$/, loader: "url-loader?mimetype=image/png"},
            {test: /\.exe$/, use:[{loader: 'file-loader'}]}

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/JS/ui/index.html'
        }),
        new webpack.ProvidePlugin({
            'React': 'react',
        })
    ]
}