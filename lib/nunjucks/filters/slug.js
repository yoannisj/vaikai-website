var _ = require('lodash');

module.exports = function(env) {

  return function(str) {
    return _.deburr(_.kebabCase(str).trim());
  };

};