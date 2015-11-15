var path = require('path');
var _ = require('lodash');
var YAML = require('yamljs');
var slurp = require('../slurp');

module.exports = function(name, dataPath) {
  // load page's yaml file
  var data = YAML.load(dataPath + '.yaml') || {};

  // set default 'name', 'title' and 'url' keys based on filename
  var pageUrl = path.join(slurp.config.paths.public, name + '.html');
  var pageTitle = _.capitalize(_.kebabCase(name).replace('-', ' '));

  // inject default values
  _.assign(data, {
    name: data.name || name,
    url: data.url || path.join(slurp.config.paths.public, name + '.html'),
    title: data.title || _.capitalize(_.kebabCase(name).replace('-', ' '))
  });

  return data;
};