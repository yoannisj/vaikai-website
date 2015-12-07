var path = require('path');
var requireDir = require('require-dir');
var slurp = require('../slurp');

var transformKeys = require('../helpers/transform-keys');

module.exports = function() {

  var dataPath = path.join('../../', slurp.config.paths.settings);

  return transformKeys(requireDir(dataPath, {
    recurse: true,
    camelCase: false,
  }), 'snakeCase', true);

};