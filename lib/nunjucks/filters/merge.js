var _ = require('lodash');

module.exports = function(env) {

  return function() {
    var sources = [{}];
    for (var i = 0, ln = arguments.length; i < ln; i++) {
      sources.push(arguments[i]);
    }

    return _.merge.apply(_, sources);
  };

};