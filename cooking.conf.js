var path = require('path');
var cooking = require('cooking');
var build = require('./build');

var isProd = process.env.NODE_ENV === 'production';

var hash = true;

var assetsPath = 'static';

cooking.set({
  entry: build.entries(),
  dist: './dist',
  template: build.templates(),
  devServer: {
    port: 8088,
    publicPath: '/',
    proxy: {}
  },
  clean: true,
  hash: hash,
  sourceMap: false,
  chunk: build.chunks(),
  postcss: [],
  publicPath: '/',
  urlLoaderLimit: false,
  assetsPath: assetsPath,
  extractCSS: isProd
    ? assetsPath + (hash ? '/css/[name].[hash:8].css' : '/css/[name].css')
    : true,
  alias: {
    src: path.join(__dirname, 'src')
  },
  extends: [
    'less',
    'vue2',
    ['autoprefixer', { browsers: ['last 2 versions'] }]
  ],
  externals: build.externals()
});

cooking.remove('loader.image');

cooking.add('loader.image', {
  test: /\.(gif|png|jpe?g)(\?\S*)?$/,
  loader: 'url-loader',
  query: {
    limit: 5000,
    name: path.posix.join(
      assetsPath,
      hash ? 'images/[name].[hash:8].[ext]' : 'images/[name].[ext]'
    )
  }
});

isProd &&
  cooking.add(
    'output.filename',
    assetsPath + (hash ? '/js/[name].[hash:8].js' : 'js/[name].js')
  );

module.exports = cooking.resolve();
