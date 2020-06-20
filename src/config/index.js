const path = require('path')

module.exports = {
    dev: {
        env: require('./dev.env'),
        host: 'localhost',
        port: 8888,
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsPublicPath: '/',
    },
    prod: {
        env: require('./prod.env'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsPublicPath: '/',
    }
};
