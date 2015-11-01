var path = require('path');
var _ = require('lodash');
var slurp = require('../slurp');

// return's all data specific to a given template file
module.exports = function(file) {
  // read page content, taken from the content file with same
  // name as page template
  var filename = path.basename(file.path, path.extname(file.path));
  var dataPath = path.join('../../', slurp.config.paths.content, './pages/', filename);
  var data = require(dataPath);

  // set default 'name', 'title' and 'url' keys based on filename
  var pageUrl = slurp.config.paths.public.trimLeft('/') + '/' + filename + '.html';
  var pageTitle = _.capitalize(_.kebabCase(filename).replace('-', ' '));

  data = _.assign({
    name: filename,
    title: pageTitle,
    url: pageUrl
  }, data);

  // wrap in a global called 'page'
  return {
    page: data
  };
};