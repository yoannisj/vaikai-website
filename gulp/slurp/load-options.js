var _ = require('lodash');
var requireDir = require('require-dir');

module.exports = function(config, env) {
  var files = requireDir('../options'),
    options = {};

  _.forOwn(files, function(opts, plugin) {
    options[_.camelCase(plugin)] = opts(config, env);
  });

  return options;
};