module.exports = function(env) {

  return function(file, withDot) {
    var extIndex = file.lastIndexOf('.');
    // include dor or not based on 'withDot' argument
    if (!withDot) extIndex++;

    return file.slice(extIndex);
  };

};