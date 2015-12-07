var webpack = require('webpack');
var slurp = require('../slurp');

var getWebpackEntries = require('../helpers/get-webpack-entries');
var getWebpackPlugins = require('../helpers/get-webpack-plugins');

// fetch webpack options and create compiler
var wpCompiler = webpack(slurp.options('webpack', {
  entry: getWebpackEntries(),
  plugins: getWebpackPlugins()
}));

function compileJavascripts(done) {

  // run webpack compiler once and tell gulp when everything has been bundled
  wpCompiler.run(function(err, stats) {
    if(err) throw new slurp.PluginError("javascripts:webpack", err);

    // show webpack feedback in shell output
    slurp.log("[webpack:build-dev]", stats.toString({
      colors: true
    }));

    // finish task
    if(done) done();
  });
}

module.exports = function(done) {
  // watch source files for re-compilation
  if (slurp.env.watch) {
    slurp.watch('javascripts', function(ev) {
      // don't pass callback since we already run it on first compilation
      compileJavascripts();
    });
  }

  compileJavascripts(done);
};