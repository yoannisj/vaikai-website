var prettyjson = require('prettyjson');

module.exports = function(env) {

  return function(value) {
    console.log('Nunjucks::', prettyjson.render(value));
  };

};