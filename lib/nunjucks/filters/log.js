var prettyjson = require('prettyjson');

module.exports = function(env) {

  return function() {

    var args = [];
    for (var i = 0, ln = arguments.length; i < ln; i++) {
      args.push( prettyjson.render(arguments[i]) );
    }

    console.log.apply(console, args);
  };

};