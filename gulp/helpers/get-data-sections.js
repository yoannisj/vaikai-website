var path = require('path');
var _ = require('lodash');
var globule = require('globule');
var YAML = require('yamljs');
var slurp = require('../slurp');

module.exports = function(page, dataPath) {
  var files = globule.find(path.join(dataPath, '*.yaml'));

  // load sections' content (maps file-name to snake-case key)
  return files.map(function(file) {
    // map filename to snake-case key
    var name = path.basename(file, path.extname(file)),
      key = _.snakeCase(name),
      data = YAML.load(file) || {};

    // inject default values
    _.assign(data, {
      name: data.name || name,
      template: data.template || path.join('pages/', page, name)
    });

    return data;
  });
};