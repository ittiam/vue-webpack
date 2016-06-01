const path = require('path');
const config = require('../config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.assetsPath = function (_path) {
  return path.posix.join(config.build.assetsSubDirectory, _path);
};

exports.cssLoaders = function (options) {
  options = options || {};
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    const sourceLoader = loaders.map(function (loader) {
      var extraParamChar = '';
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?');
        extraParamChar = '&';
      } else {
        loader = loader + '-loader';
        extraParamChar = '?';
      }
      return loader + (options.sourceMap ? `${extraParamChar}sourceMap` : '');
    }).join('!');

    if (options.extract) {
      return ExtractTextPlugin.extract('vue-style-loader', sourceLoader);
    } else {
      return ['vue-style-loader', sourceLoader].join('!');
    }
  }

  // http://vuejs.github.io/vue-loader/configurations/extract-css.html
  return {
    css: generateLoaders(['css', 'postcss']),
    postcss: generateLoaders(['css', 'postcss']),
    less: generateLoaders(['css', 'less', 'postcss']),
    sass: generateLoaders(['css', 'sass?indentedSyntax', 'postcss']),
    scss: generateLoaders(['css', 'sass', 'postcss']),
    stylus: generateLoaders(['css', 'stylus', 'postcss']),
    styl: generateLoaders(['css', 'stylus', 'postcss'])
  };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = [];
  const loaders = exports.cssLoaders(options);
  for (var extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    });
  }
  return output;
};
