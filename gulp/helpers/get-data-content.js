var path = require('path');
var globule = require('globule');
var slurp = require('../slurp');

var getPageData = require('../helpers/get-data-page');

module.exports = function() {
  // get website's content from the content folder
  // TODO: allow YAML

  var templPaths = slurp.path('templates', 'main');
  var content = {
    pages: {}
  };

  // find pages' content
  var pageFiles = globule.find(templPaths);

  pageFiles.map(function(file) {
    var name = path.basename(file, path.extname(file)),
      dataPath = path.join(slurp.config.paths.content, name),
      data = getPageData(name, dataPath);

    content['pages'][name] = data;
  });

  // console.log('content::', content);

  return content;
};