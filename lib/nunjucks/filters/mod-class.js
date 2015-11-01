module.exports = function(env) {

  // optionally adds a modifier classname to given class
  return function(classname, modifier) {
    if (modifier) {
      return classname + ' ' + classname + '--' + modifier;
    }

    return classname;
  };

};