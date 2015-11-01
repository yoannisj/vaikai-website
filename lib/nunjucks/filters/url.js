var _ = require('lodash');

module.exports = function(env) {

  var app = env.getGlobal('app');

  return function(urlPath) {
    return _.trimRight(app.paths.public, '/') + '/' + _.trimLeft(urlPath, '/');
  };

};