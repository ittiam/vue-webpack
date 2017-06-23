const path = require('path');
const fs = require('fs');

const pages = [];
const basePath = './src/pages/';

const files = fs.readdirSync(basePath);

files.forEach(f => {
  const p = path.resolve(basePath, f);
  if (fs.statSync(p).isDirectory()) {
    pages.push({
      entry: f
    });
  }
});

exports.entries = function() {
  const result = {};
  pages.forEach(p => {
    result[p.entry] = path.resolve(basePath, p.entry);
  });
  return result;
};

exports.templates = function() {
  return pages.map(p => ({
    filename: `${p.entry}.html`,
    template: path.resolve(basePath, p.entry, 'index.html'),
    chunks: ['vendor', p.entry]
  }));
};

exports.chunks = function() {
  const chunks = pages.map(p => p.entry);

  return [
    {
      name: 'vendor',
      chunks
    }
  ];
};

exports.externals = function() {
  return {
    jquery: 'jQuery'
  };
};
