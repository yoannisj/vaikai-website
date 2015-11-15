module.exports = function() {

  return function(params) {
    var q = '?';
    var keys = Object.getOwnPropertyNames(params);

    // add query params to string
    for (var i = 0, ln = keys.length, last = ln - 1; i < ln; i++) {
      var key = keys[i];
      // add query param to query string
      q += key + "=" + params[key];
      // add encoded '&' to separate with next param
      if (i < last) q += '&amp;';
    }

    return q;
  };

};