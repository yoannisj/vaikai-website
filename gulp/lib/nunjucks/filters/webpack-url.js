var _ = require('lodash');

module.exports = function(env) {

  var app = env.getGlobal('app');

  return function(urlPath) {
    // if in watch mode, use 'webpack-dev-server' url
    if (app.watch) {
      return _.trimRight(app.paths.webpackDev, '/') + '/' + _.trimLeft(urlPath, '/');
    }

    return env.getFilter('url')(urlPath);
  };

};