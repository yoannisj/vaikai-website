var _ = require('lodash');

module.exports = function(env) {

  return function(str, chars) {
    return _.trimRight(str, chars || '');
  };

};