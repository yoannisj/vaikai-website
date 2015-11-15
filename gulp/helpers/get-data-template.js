var path = require('path');
var _ = require('lodash');
var slurp = require('../slurp');

var getPageData = require('../helpers/get-data-page');
var getSectionsData = require('../helpers/get-data-sections');

// return's all data specific to a given template file
module.exports = function(file) {
  // read page content, taken from the content file with same
  // name as page template
  var filename = path.basename(file.path, path.extname(file.path));
  var dataPath = path.join(slurp.config.paths.content, filename);
  var templPath = path.join(slurp.path('templates', 'base'), './pages/', filename);

  var pageData = getPageData(filename, dataPath);
  var sectionsData = getSectionsData(filename, dataPath);

  // sort sections
  if (pageData.hasOwnProperty('sections_order')) {
    var order = pageData['sections_order'];

    sectionsData = _.sortBy(sectionsData, function(section) {
      var index = order.indexOf(section.name);

      // send not found sections to bottom
      return index >= 0 ? index : total;
    });
  }

  return {
    page: pageData,
    sections: sectionsData
  };
};