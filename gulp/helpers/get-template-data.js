var path = require('path');
var _ = require('lodash');
var fm = require('front-matter');

// return's all data needed to render a given template file
module.exports = function(file) {

  var filename = path.basename(file.path, path.extname(file.path)),
    contentPath = path.join('../../src/content', filename);

  // read front-matter
  var content = fm(String(file.contents));
  // remove front-matter from file content
  file.contents = new Buffer(content.body);

  // inject page information in the data
  return _.assign({}, {
    // page information, taken from the front-matter
    page: content.attributes,
    // content
    content: require(contentPath)
  });

};