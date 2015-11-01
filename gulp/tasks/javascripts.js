var path = require('path');
var _ = require('lodash');
var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var slurp = require('../slurp');

var getWebpackEntries = require('../helpers/get-webpack-entries');
var getWebpackPlugins = require('../helpers/get-webpack-plugins');

// fetch webpack options
var wpConfig = slurp.options('webpack', {
  entry: getWebpackEntries(),
  plugins: getWebpackPlugins()
});

module.exports = function(done) {
  // For development, serve files with webpack-dev-server
  // @link http://webpack.github.io/docs/webpack-dev-server.html
  // @link https://github.com/webpack/webpack-with-common-libs/blob/master/gulpfile.js
  if (slurp.env.watch) {
    var wpDevConfig = _.merge({}, wpConfig, {
      // files are in memory so output path doesn't really matter
      // but it needs to be defined or it will throw an error
      output: {
        path: '/'
      }
    });

    // run webpack-dev-server re-bundling entry files (in memory)
    // and re-loading web page automatically
    new webpackDevServer(webpack(wpDevConfig), wpDevConfig.devServer)
      .listen(8080, 'localhost', function(err) {
        if(err) throw new slurp.PluginError("webpack-dev-server", err);
      });
  }

  // For production, optimize and bundle files on disk
  // @link https://github.com/webpack/webpack-with-common-libs/blob/master/gulpfile.js
  else {
    // run webpack compiler once
    webpack(wpConfig).run(function(err, stats) {
      if(err) throw new slurp.PluginError("javascripts:webpack", err);

      // show webpack feedback in shell output
      slurp.log("[webpack:build-dev]", stats.toString({
        colors: true
      }));

      // finish task
      done();
    });
  }

};