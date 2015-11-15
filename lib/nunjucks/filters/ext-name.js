module.exports = function(env) {

  return function(path, replace) {
    var extIndex = path.lastIndexOf('.') + 1;

    // replace path's extension name with new extension
    if (replace) {
      return path.slice(0, extIndex) + replace;
    }

    // or return the given path's current extension name
    return path.slice(extIndex);
  };

};