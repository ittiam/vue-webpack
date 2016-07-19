// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path');
const fs = require('fs');

function findFiles(dir, filter) {
  if (!fs.existsSync(dir)) {
    console.log('目录不存在！', dir);
    return;
  }

  const files = fs.readdirSync(dir);
  return files.filter(function (name) {
    const filename = path.join(dir, name);
    if (!fs.lstatSync(filename).isDirectory() && filename.indexOf(filter) >= 0) {
      return true;
    }
    return false;
  });
}

const htmls = findFiles(path.resolve(__dirname, '../template'), '.html');
const pages = {};
htmls.forEach(function (filename) {
  const basename = path.basename(filename, '.html');
  pages[basename] = {
    entry: `./src/${basename}`,
    html: path.resolve(__dirname, `../dist/${basename}.html`)
  };
});

module.exports = {
  pages,
  build: {
    env: require('./prod.env'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true
  },
  proxy: {
    host: 'http://m.wdzj.com/'
  },
  dev: {
    env: require('./dev.env'),
    port: 8081
  }
};
