var path = require('path');
var slurp = require('../slurp');
var requireDir = require('require-dir');

module.exports = function() {
  // get website's content from the content folder
  // TODO: allow YAML
  var contentPath = path.join('../../', slurp.config.paths.content);
  var data = requireDir(contentPath, {
    camelCase: true,
    recurse: true
  });

  return data;
};