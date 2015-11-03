module.exports = {

  _readAttrBreakpoints: function($elem, attr) {
    var breakpoints = [],
      data = $elem.attr('data-' + attr);

    if (!data) return null;

    // loop over breakpoint segments
    data = data.split(',');
    for (var i = 0, ln = data.length; i < ln; i++) {
      var breakpoint = data[i].trim().split(' ');

      breakpoints.push({
        width: breakpoint.length > 1 ? parseInt(breakpoint[1], 10): 0,
        value: breakpoint[0],
      });
    }

    return breakpoints;
  },

  getAttrBreakpoints: function($elem, attr) {
    var key = attr + 'Breakpoints',
      data = $elem.data(key);

    if (data === undefined) {
      $elem.data(key, this._readAttrBreakpoints($elem, attr));
      data = $elem.data(key);
    }

    return data;
  },

  getBreakpointValue: function(breakpoints) {
    var currWidth = 0;
    var currValue = null;

    for (var i = 0, ln = breakpoints.length; i < ln; i++) {
      var breakpoint = breakpoints[i];

      if (Modernizr.mq('(min-width:' + breakpoint.width + 'px)'))
      {
        var w = parseInt(breakpoint.width, 10);
        if (w >= currWidth) {
          currWidth = w;
          currValue = breakpoint.value;
        }
      }
    }

    return currValue;
  },

  getAttrValue: function($elem, attr) {
    var breakpoints = this.getAttrBreakpoints($elem, attr);
    return breakpoints ? this.getBreakpointValue(breakpoints) : null;
  }
};
