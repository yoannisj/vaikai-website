var path = require('path');

function prependPattern(pattern, base) {
  // keep '!' in front of negation patterns
  if (pattern.charAt(0) == '!') {
    return '!' + path.join(base, pattern.slice(1));
  }

  return path.join(base, pattern);
}

module.exports = function(pattern, base) {
  // allow array patterns
  if (Array.isArray(pattern)) {
    return pattern.map(function(patt) {
      return prependPattern(patt, base);
    });
  }

  return prependPattern(pattern, base);
};