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
      smoothHeight: false,
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
      directionNav: false
    });

    // create slider
    this.slider = this.$el.flexslider(flexSettings).data('flexslider');
    this.$el.addClass('has-flexslider');
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

    this.slider.vars.minItems = numItems;
    this.slider.vars.maxItems = numItems;
    this.slider.vars.move = numItems;
    this.slider.vars.itemMargin = itemMargin;
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
