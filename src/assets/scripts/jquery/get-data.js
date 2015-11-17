$.fn.getData = function(name, df) {
  // get previously stored data
  var data = this.data(name);

  // if no data was stored yet
  if (!data) {
    // use value returned by 'df' function as data
    if (typeof df == 'function') {
      var args = [];
      for (var i = 2, ln = arguments.length; i < ln; i++) {
        args.push(arguments[i]);
      }

      data = df.apply(this, args);
    }

    // or 'df' value if not a function
    else {
      data = df;
    }

    // and store data for later access
    this.data(name, data);
  }

  // return data
  return data;
};