// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
var fs = require('fs');

function findFiles(dir, filter) {
  if (!fs.existsSync(dir)) {
    console.log('目录不存在！', dir);
    return;
  }

  var files = fs.readdirSync(dir);
  return files.filter(function(name) {
    var filename = path.join(dir, name);
    if (!fs.lstatSync(filename).isDirectory() && filename.indexOf(filter) >= 0) {
      return true;
    }
    return false;
  });
}

var htmls = findFiles(path.resolve(__dirname, '../'), '.html');
var pages = {};
htmls.forEach(function(filename) {
  var basename = path.basename(filename, '.html');
  pages[basename] = {
    entry: './src/' + basename + '.js',
    html: path.resolve(__dirname, '../dist/' + basename + '.html')
  }
});

module.exports = {
  pages: pages,
  build: {
    env: require('./prod.env'),
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
