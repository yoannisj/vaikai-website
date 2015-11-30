var Fold = require('widgets/fold');
var Collapse = require('widgets/collapse');
var breakpoints = require('data.json').breakpoints;

var MultiFold = module.exports = Fold.extend({

  name: 'multifold',

  defaults: {
    debounceTime: 240,
    foldSpeed: 600,
    scrollTime: 600,
    scrollOffset: 0
  },

  init: function() {
    // TODO: move this to CSS
    this.$el.css('overflow', 'hidden');
    this.$items = this.find('item');

    Collapse.prototype.init.call(this);
    this.listen();
  },

  update: function() {
    this._top = this.$el.offset().top;
    this._collapsedH = this._collapsedHeight();
    this._expandedH = this.el.scrollHeight;

    Collapse.prototype.update.call(this);
  },

  _minItems: function() {
    return window.innerWidth >= breakpoints['m'] ? 3 :
      (window.innerWidth >= breakpoints['sm'] ? 4 : 2);
    // return window.innerWidth >= breakpoints['m'] ? 3 : 2;
  },

  _collapsedHeight: function() {
    var lowest = this._top;

    // get bottom of lowest item in 'minItems'
    this.$items.slice(0, this._minItems()).each(function() {
      var $itm = $(this),
        itmBottom = $itm.offset().top + $itm.outerHeight();

      lowest = Math.max(lowest, itmBottom);
    });

    // return difference between top and bottom of lowest minItem
    return lowest - this._top;
  }

});

// autoinit widget
$('[data-init~="multifold"]').widget(MultiFold);
