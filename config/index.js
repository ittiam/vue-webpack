// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

var pages = {
  index: {
    entry: './src/main.js',
    html: path.resolve(__dirname, '../dist/index.html')
  },
  hotcss: {
    entry: './src/hotcss.js',
    html: path.resolve(__dirname, '../dist/hotcss.html')
  }
};

module.exports = {
  pages: pages,
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    proxyTable: {}
  }
};
