var _ = require('lodash');

module.exports = function(env) {

  var app = env.getGlobal('app');

  return function(urlPath) {
    var url = env.getFilter('url');

    // if in watch mode, use 'webpack-dev-server' url
    if (app.watch) {
      return _.trimRight(app.paths.webpackDev, '/') + '/' + _.trimLeft(urlPath, '/');
    }

    return url(urlPath);
  };

};