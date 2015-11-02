var mime = require('mime-types');

module.exports = function(env) {

  return function(file) {
    return mime.lookup(file);
  };

};