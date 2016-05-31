var webpack = require('webpack');

module.exports = function commonChunks () {

  return [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        );
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
}
