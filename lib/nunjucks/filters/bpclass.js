// filter function
function bpClassname(classname, breakpoint, suffix) {
  // if array of breakpoints, apply with each breakpoint
  if (Array.isArray(breakpoint)) {
    return breakpoint.map(function(bp) {
      return bpClassname(classname, bp, suffix);
    });
  }

  // if an object is passed instead of 'breakpoint' and 'suffix',
  // use object key as 'breakpoint' and value as 'suffix'
  else if (typeof breakpoint == object) {
    var cname = [],
      breakpoints = breakpoint.getOwnPropertyNames();

    for (var i = 0, ln = breakpoints.length; i < ln; i++) {
      var bp = breakpoints[i], suff = breakpoint[bp];
      cname.push(bpClassname(classname, bp, suff));
    }

    // return classname string
    return cname.join(' ');
  }

  // if array of classnames
  if (Array.isArray(classname)) {
    // apply to each classname and return classname string
    return classname.map(function(cname) {
      return bpClassname(bp, cname, suffix);
    }).join(' ');
  }

  // get default suffix OR add a hyphen separator
  suffix = suffix ? '-' + suffix : '';
  // build new classname string
  return bp + '-' + classname + suffix;
}

module.exports = function(env) {

  // delegate to recursive function
  return function(classname, breakpoint, suffix) {
    return bpClassname(classname, breakpont, suffix);
  };

};