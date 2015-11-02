module.exports = function(env) {

  // optionally adds a modifier classname to given class
  return function(classname, modifier) {
    return (modifier && modifier.length) ? classname + '--' + modifier : '';
  };

};