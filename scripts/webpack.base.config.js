const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

const config = require('../src/config')

const ENV = process.env.NODE_ENV || "development";
const devMode = ENV === "development";

function resolve(v) {
    return path.join(__dirname, v);
  }

module.exports = {
    mode: devMode ? "development" : "production",
    devtool: devMode ? "#source-map" : "inline-source-map",
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    },
    entry: {
        client: resolve('../src/index.tsx')
    },
    output: {
        path: resolve('../dist'),
        // publicPath: devMode ? config.dev.assetsPublicPath : config.prod.assetsPublicPath,
        filename: `js/[name]${devMode ? '' : '-bundle-[hash:8]'}.js`,// 文件名,不加hash,以方便调试时使用，生产环境下可以设置为 [name]-bundle-[hash:8].js
    },
    module: {
        rules: [
        {
            enforce: "pre",
            test: /\.js$/,
            loader: "source-map-loader"
        },
        {
            test: /\.(ts|tsx)$/,
            loader: "ts-loader",
        },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React + Typescript',
            template: resolve('../public/index.html'), 
            favicon: resolve('../favicon.ico'),
            // inject: false,
        }),
        new webpack.DefinePlugin({
            'process.env': devMode ? config.dev.env : config.prod.env
        }),
    ],
}
