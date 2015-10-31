var _ = require('lodash');
var fm = require('front-matter');

// environment and globals
// var getAppData = require('../helpers/get-app-data');
// var appData = getAppData();

// return's all data needed to render a given template file
module.exports = function(file) {

  // read front-matter
  var content = fm(String(file.contents));
  // remove front-matter from file content
  file.contents = new Buffer(content.body);

  // inject page information in the data
  return _.assign({}, {
    // page information, taken from the front-matter
    page: content.attributes
  });

};