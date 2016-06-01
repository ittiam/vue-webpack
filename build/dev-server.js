const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf');

const projectRoot = path.resolve(__dirname, '../');

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port;

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
});

const hotMiddleware = require('webpack-hot-middleware')(compiler);
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// server.conf 功能
// 支持 mock/ 目录下面 .js js 脚本功能和 json 预览功能。
// 注意这里面的.js，不是一般的.js 文件，而是相当于 express 的 route.
app.use(require('yog-devtools')({
  view_path: '',    // 避免报错。
  rewrite_file: [path.join(projectRoot, 'mock', 'server.conf')],
  data_path: [path.join(projectRoot, 'mock')]
}));

// serve pure static assets
const staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:' + port + '\n');
});
