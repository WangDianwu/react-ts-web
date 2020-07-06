const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path');
const HappyPack = require('happypack');  // 多线程处理
const os = require('os');

const config = require('../src/config')

const ENV = process.env.NODE_ENV || "development";
const devMode = ENV === "development";

function resolve(v) {
  return path.join(__dirname, v);
}

// 多线程
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});

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
    filename: process.env.NODE_ENV === 'production' ? '[name].[chunkhash:8].js' : '[name].[hash:8].js',
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
        exclude: resolve("../node_modules")
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     'css-loader'
      //   ],
      //   include: /node_modules/
      // },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
              reloadAll: devMode
            }
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
          // {
          //   loader: 'sass-resources-loader',
          //   options: {
          //     resources: resolve('../src/style/base.scss')
          //   }
          // }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            name: '[name].[hash:8].[ext]'
          }
        }]
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React + Typescript',
      template: resolve('../public/index.html'),
      favicon: resolve('../favicon.ico'),
      // inject: false,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css'
    }),
    new webpack.DefinePlugin({
      'process.env': devMode ? config.dev.env : config.prod.env
    }),
    // new HappyPack({
    //   id: 'happyBabel',
    //   loaders: [
    //     {
    //       loader: 'babel-loader',
    //       options: {
    //         cacheDirectory: true
    //       }
    //     }
    //   ],
    //   threadPool: happyThreadPool,
    //   verbose: false
    // }),
  ],
}