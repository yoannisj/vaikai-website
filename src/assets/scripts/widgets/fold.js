var Collapse = require('widgets/collapse');
var debounce = require('debounce');
var smoothScroll = require('utils/smooth-scroll');

var $win = $(window),
  $scroller = $('html, body');

var Fold = module.exports = Collapse.extend({

  name: 'fold',

  defaults: {
    debounceTime: 240,
    foldSpeed: 600,
    scrollTime: 600,
    scrollOffset: 0
  },

  init: function() {
    // TODO: move this to CSS
    this.$el.css('overflow', 'hidden');

    this.$summary = this.find('summary');
    Fold.__super__.init.call(this);
    this.listen();
  },

  listen: function() {
    var self = this;
    $win.on('resize', debounce(function(ev) {
      self.update();
    }, this.settings.debounceTime));
  },

  update: function() {
    this._top = this.$el.offset().top;
    this._expandedH = this.el.scrollHeight;
    this._collapsedH = this.$summary.outerHeight();

    Fold.__super__.update.call(this);
  },

  expand: function(scroll) {
    Fold.__super__.expand.call(this);

    // udpate height
    this._fold(this._expandedH);

    // optionally update scroll position
    if (scroll) this._scroll();
  },

  collapse: function(scroll) {
    Fold.__super__.collapse.call(this);

    // udpate height
    this._fold(this._collapsedH);

    // optionally update scroll position
    if (scroll) this._scroll();
  },

  _fold: function(height) {
    this.$el.animate({
      'height': height
    }, this.settings.foldSpeed);
  },

  _scroll: function() {

    console.log('scroll offset', this.settings.scrollOffset);

    var sTop = this._expanded ? this._top + this._collapsedH :
      this._top;

    smoothScroll($scroller, sTop, this.settings.scrollTime, this.settings.scrollOffset);
  },

  destroy: function() {
    $win.off('.' + this.baseClass);
    this.$el.css('height', '');

    Fold.__super__.destroy.call(this);
  }

});

$('[data-init~="fold"]').widget(Fold);