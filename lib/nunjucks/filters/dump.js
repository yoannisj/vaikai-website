var prettyjson = require('prettyjson');

module.exports = function(env) {

  return function(value) {
    var e = env.getFilter('escape');
    return '<code><pre>' + e(prettyjson.render(value, {
      noColor: true
    })) + '</pre></code>';
  };

};