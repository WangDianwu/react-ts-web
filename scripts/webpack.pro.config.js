const webpackMerge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin; //"clean-webpack-plugin": "^3.0.0"
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const baseConfig = require('./webpack.base.config');

const prodConfig = {
    mode: 'production',
    output: {
      publicPath: './',
    },
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                warnings: false
            },
            cache: true,
            parallel: true,
            sourceMap: true
        }),
        // 每次编译之前，清空上一次编译的文件
        new CleanWebpackPlugin()
    ],
}
module.exports = webpackMerge(prodConfig, baseConfig);
