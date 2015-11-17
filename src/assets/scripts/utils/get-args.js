module.exports = function(args, first, end) {
  // default to full list of arguments
  first = first || 1;
  last = last || args.length;

  // map 'first' and 'last' to 0-based index
  var start = Math.max(first - 1, 0);
  // negative 'end' argument counts from right to left
  var last = end > 0 ? end : args.length + end;

  // collect selected arguments in an array
  var arr = [];
  for (var i = start; i < end; i++) {
    arr.push(arguments[i]);
  }

  return arr;
};