module.exports = function(env) {

  return function(value) {
    return '<pre>' + JSON.stringify(value) + '</pre>';
  };

};