module.exports = function(env) {

  return function(val) {
    return Array.isArray(val) ? 'array' : (typeof val);
  };

};