var path = require('path');

module.exports = function(env) {

  return function() {
    return path.join.apply(path, arguments);
  };

};