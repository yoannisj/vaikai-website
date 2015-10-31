// renames a template file so it has the correct extension
module.exports = function(path) {
  path.basename = path.basename.replace('.html', '');
  path.extname = '.html';
};