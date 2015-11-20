var BaseWidget = require('widgets/base');
var debounce = require('debounce');
var breakpoints = require('data.json').breakpoints;

var $win = $(window),
  $scroller = $('html, body');

require('flexslider');

var Carousel = module.exports = BaseWidget.extend({

  name: 'carousel',

  defaults: {
    debounceTime: 180,
    sliderSettings: {
      animation: 'slide',
      smoothHeight: true,
      slideshow: false,
      animationLoop: false,
      animationSpeed: 400,
      keyboard: false,
      multipleKeyboard: false
    }
  },

  init: function() {
    Carousel.__super__.init.call(this);

    this.initSlider();
    this.listen();
  },

  initSlider: function() {
    // get dynamic settings
    var numItems =  this._getNumItems(),
      itemMargin =  this._getItemMargin(),
      itemWidth = this.$el.width() / numItems;

    // inject functional settings in slider settings
    var flexSettings = $.extend({}, this.setting('sliderSettings'), {
      selector: this.slct('items') + ' ' + this.slct('item'),
      minItems: numItems,
      maxItems: numItems,
      move: numItems,
      itemWidth: itemWidth,
      itemMargin: this._getItemMargin(),
      directionNav: false,
    });

    // override smooth Height functionality
    if (flexSettings.smoothHeight) {
      this._useSmoothHeight = true;
      // don't use flexslider's smoothHeight functionality
      flexSettings.smoothHeight = false;

      // inject functional callback on 'before' for better smoothHeight
      var self = this;
      flexSettings.before = flexSettings.start = function() {
        self._smoothHeight();
      };
    }

    // create slider
    this.slider = this.$el.flexslider(flexSettings).data('flexslider');
    this.$el.addClass('has-flexslider');

    // cache values for later
    this.$items = this.find('item');
    this.$viewport = this.$el.find('.flex-viewport');
    this.numItems = numItems;
  },

  listen: function() {
    var self = this;
    $win.on('resize', debounce(function(ev) {
      self.updateSlider();
    }, this.setting('debounceTime')));
  },

  _getNumItems: function() {
    return window.innerWidth >= breakpoints['m'] ? 3 :
      (window.innerWidth >= breakpoints['sm'] ? 2 : 1);
  },

  _getItemMargin: function() {
    return window.innerWidth >= breakpoints['m'] ? 40 : 20;
  },

  updateSlider: function() {
    var numItems = this._getNumItems();
    var itemMargin = this._getItemMargin();

    this.numItems = numItems;
    this.slider.vars.minItems = numItems;
    this.slider.vars.maxItems = numItems;
    this.slider.vars.move = numItems;
    this.slider.vars.itemMargin = itemMargin;

    // apply overriden smoothHeight
    if (this._useSmoothHeight) this._smoothHeight();
  },

  _smoothHeight: function() {
    // get ALL items in current slide
    var currStart = this.slider.animatingTo * this.numItems,
      currEnd = currStart + this.numItems;

    if (currEnd > this.$items.length) {
      currEnd = this.$items.length;
      currStart = this.$items.length - this.numItems;
    }

    var $currItems = this.$items.slice(currStart, currEnd),
      currHeight = 0;

    // get height of tallest item in current slide
    $currItems.each(function() {
      currHeight = Math.max(currHeight, $(this).outerHeight(true));
    });

    // apply to viewport
    this.$viewport.animate({
      'height':  currHeight
    }, this.settings.animatinoSpeed);
  },

  destroy: function() {
    // this.slider.destroy();
    // Flexslider doesn't have a destroy method
    // TODO: destroy flexslider manually (remove css, remove jquery date,
    // remove listeners, remove 'this.slider')

    Carousel.__super__.destroy.call(this);
  }

});

// auto-init widgets
$('[data-init~="carousel"]').widget(Carousel);
