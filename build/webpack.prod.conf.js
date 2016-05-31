var path = require('path');
var config = require('../config');
var utils = require('./utils');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env;

var chunks = Object.keys(config.pages);

var plugins = Object.keys(config.pages).map(function(name) {
  return new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? name + '.html'
        : config.pages[name].html,
      template: name + '.html',
      inject: true,
      chunks: ['vendor', name],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    });
});

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('scripts/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('scripts/[id].[chunkhash].js')
  },
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: chunks,
      minChunks: chunks.length
    }),
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('styles/[name].[contenthash].css'))
  ].concat(plugins)
});
