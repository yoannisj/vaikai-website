module.exports = function(env) {

  var app = env.getGlobal('app');

  return function(url) {

    if (url.indexOf('://') >= 0 && url.indexOf(app.paths.public) < 0) {
      return '_blank';
    }

    return '_self';
  };

};