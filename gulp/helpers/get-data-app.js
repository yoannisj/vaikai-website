var path = require('path');
var _ = require('lodash');
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
    paths: _.assign(slurp.config.paths, {
      livereload: lrPath,
      webpackDev: wdsPath,
      images_src: slurp.path('images', 'base'),
      images:  slurp.setting('images', 'base').dest
    }),
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