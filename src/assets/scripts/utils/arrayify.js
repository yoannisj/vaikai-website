module.exports = function(val) {
  if (Array.isArray(val)) return val;
  return new Array(val);
};