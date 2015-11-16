var _ = require('lodash');

module.exports = function(env) {

  return function(coll, attr, value) {
    return _.find(coll, function(obj) {
      return obj[attr] == value;
    });
  };

};