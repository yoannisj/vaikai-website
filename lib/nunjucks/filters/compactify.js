module.exports = function(env) {

  return function(str) {
    var slugify = env.getFilter('slugify');
    return slugify(str).replace('-', '');
  };

};