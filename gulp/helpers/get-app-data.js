var path = require('path');
var _ = require('lodash');
var requireDir = require('require-dir');
var slurp = require('../slurp');

// get global data from the 'data' folder
var globals = {};
// read files in the 'data' folder
var dataPath = path.join('../../', slurp.config.paths.data);
_.forOwn(requireDir(dataPath), function(value, name) {
  globals[_.camelCase(name)] = value;
});

// get data from plugin options
var lr = slurp.options('livereload');
var lrPath = 'http://' + lr.host + ':' + lr.port + '/';
var wds = slurp.options('webpack').devServer;
var wdsPath = 'http://' + wds.host + ':' + wds.port + '/';

// fetches app data to use in nunjucks templates
// - includes useful info about dev environment
// - includes global data from the 'data' folder
module.exports = function() {

  return {
    environment: slurp.env.dev ? 'dev' : 'prod',
    watch: !!(slurp.env.watch),
    paths: {
      public: slurp.config.paths.public,
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