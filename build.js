var path = require('path');
var fs = require('fs');
var pages = [];
var basePath = './src/pages/';

var files = fs.readdirSync(basePath);

files.forEach(f => {
  var p = path.resolve(basePath, f);
  if (fs.statSync(p).isDirectory()) {
    pages.push({
      entry: f
    });
  }
});

exports.entries = function() {
  var result = {}
  pages.forEach(p => {
    result[p.entry] = path.resolve(basePath, p.entry)
  })
  return result
}

exports.templates = function() {
  return pages.map(p => {
    return {
      filename: p.entry + '.html',
      template: path.resolve(basePath, p.entry, 'index.html'),
      chunks: ['vendor', 'manifest', p.entry]
    }
  })
}

exports.chunks = pages;

exports.externals = function() {
  return {
    jquery: 'jQuery'
  }
}
