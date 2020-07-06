const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const baseConfig = require('./webpack.base.config');
const config = require('../src/config')

const devConfig = {
    devServer: {
        historyApiFallback: true,// 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        disableHostCheck: true,// 关闭 Host 检查，同网段其他设备，可通过内网 IP 访问本机服务（需要配合 host: '0.0.0.0'）使用
        hot: true, // 模块热更新，取决于HotModuleReplacementPlugin
        host: config.dev.host,
        port: config.dev.port,
        open: true,
        inline: true,
        overlay: true,
        // watchOptions: {
        //     ignored: /node_modules/,
        // },
        // 请求代理服务
        // proxy: {
        //   '/api': {
        //     // 这里改为项目后端 API 接口 Host
        //     target: 'http://backend.api.host',
        //     // 支持跨域调用
        //     changeOrigin: true,
        //   }
        // }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
}
module.exports = webpackMerge(devConfig, baseConfig);
