var _ = require('lodash');

module.exports = function(env) {

  var app = env.getGlobal('app');

  return function(urlPath) {
    // don't touch string that are already urls
    if (urlPath.indexOf('://') >= 0) return urlPath;

    return _.trimRight(app.paths.public, '/') + '/' + _.trimLeft(urlPath, './');
  };

};