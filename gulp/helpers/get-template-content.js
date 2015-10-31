var _ = require('lodash');
var path = require('path');
var requireDir = require('require-dir');

module.exports = function(file) {
  // get filename and read corresponding content from 'contents' folder
  var filename = path.basename(file.path, path.extname(file.path)),
    sections = requireDir( path.join('../../src/content', filename )),
    content = {};

  _.forOwn(section, function(data, filename) {
    content[_.camelCase(filename)] = data;
  });

  return content;
};