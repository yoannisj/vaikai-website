var _ = require('lodash');

module.exports = function(env) {

  var app = env.getGlobal('app');

  return function(urlPath) {
    var cleanPath = _.trimLeft(_.trimLeft(urlPath, './'), '/');
    return _.trimRight(app.paths.public, '/') + '/' + cleanPath;
  };

};