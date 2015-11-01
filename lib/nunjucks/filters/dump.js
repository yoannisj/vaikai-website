var prettyjson = require('prettyjson');

module.exports = function(env) {

  var e = env.getFilter('escape');

  return function(value) {
    return '<code><pre>' + e(prettyjson.render(value, {
      noColor: true
    })) + '</pre></code>';
  };

};