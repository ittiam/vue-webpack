const path = require('path');
const cooking = require('cooking');
const build = require('./build');

const isProd = process.env.NODE_ENV === 'production';

const hash = true;

const assetsPath = 'static';

const AUTOPREFIXER_BROWSERS = [
  'iOS >= 6',
  'Android >= 4',
  'ChromeAndroid >= 40'
];

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
  hash,
  sourceMap: false,
  chunk: build.chunks(),
  postcss: [],
  publicPath: '/',
  urlLoaderLimit: false,
  assetsPath,
  extractCSS: isProd
    ? assetsPath + (hash ? '/css/[name].[hash:8].css' : '/css/[name].css')
    : true,
  alias: {
    src: path.join(__dirname, 'src')
  },
  extends: [
    'less',
    'vue2',
    ['autoprefixer', { browsers: AUTOPREFIXER_BROWSERS }]
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
