var webpack = require('webpack');
var slurp = require('../slurp');

module.exports = function() {

  plugins = slurp.options('webpack').plugins;

  if (!slurp.env.dev) {
    plugins = plugins.concat([
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(slurp.options('uglify'))
    ]);
  }

  return plugins;

};