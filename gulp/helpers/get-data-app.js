var path = require('path');
var slurp = require('../slurp');

// fetches app data to use in nunjucks templates
// - includes useful info about dev environment
// - includes global data from the 'data' folder
module.exports = function() {

  // get data from plugin options
  var lr = slurp.options('livereload');
  var lrPath = 'http://' + lr.host + ':' + lr.port + '/';
  var wds = slurp.options('webpack').devServer;
  var wdsPath = 'http://' + wds.host + ':' + wds.port + '/';

  return {
    environment: slurp.env.dev ? 'dev' : 'prod',
    watch: !!(slurp.env.watch),
    paths: {
      root: path.resolve(slurp.config.paths.dest),
      public: slurp.config.paths.public,
      images: path.join(slurp.setting('assets', 'base').dest, './images/'),
      livereload: lrPath,
      webpackDev: wdsPath
    },
    servers: {
      livereload: {
        host: lr.host,
        port: lr.port,
        url: lrPath + 'livereload.js'
      },
      webpackDev: {
        host: wds.host,
        port: wds.port,
        url: wdsPath + 'webpack-dev-server.js'
      }
    }
  };

};