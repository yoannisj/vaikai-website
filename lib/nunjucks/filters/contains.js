module.exports = function(env) {

  return function(val, search, from) {

    if (typeof val == 'string' || Array.isArray(val)) {
      return val.indexOf(search, from || 0) >= 0 ? true : false;
    }

    else if (typeof val == 'object') {
      return val.hasOwnProperty(search);
    }
  };

};